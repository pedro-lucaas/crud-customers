let url;
if (window.location.hostname === 'localhost') {
  url = 'http://localhost:3000/customers';
} else {
  url = 'https://crud-customers-afwve5ba5a-rj.a.run.app/customers';
}

class API {
  constructor(url) {
    this.url = url;
    this.page = 1;
  }

  setPage(page) {
    this.page = page;
    this.fetchClients();
  }

  fetchClients(page = this.page) {
    const params = { page };

    return $.ajax({
      url: this.url,
      method: 'GET',
      data: params,
      success: (data) => {
        renderTable(data.items);
        renderPagination(data);
      },
      error: (error) => {
        $.notify(error.responseJSON.message, 'error');
      }
    });
  }

  createClients(name, email, phone) {
    const data = { name, email, phone };

    return $.ajax({
      url: this.url,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: () => {
        $.notify('Cliente criado com sucesso!', 'success');
        this.fetchClients();
      },
      error: (error) => {
        $.notify(error.responseJSON.message, 'error');
      }
    });
  }

  updateClients(id, name, email, phone) {
    const data = { name, email, phone };

    return $.ajax({
      url: `${this.url}/${id}`,
      method: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: () => {
        $.notify('Cliente atualizado com sucesso!', 'success');
        this.fetchClients();
      },
      error: (error) => {
        $.notify(error.responseJSON.message, 'error');
      }
    });
  }

  deleteClients(id) {
    return $.ajax({
      url: `${this.url}/${id}`,
      method: 'DELETE',
      success: () => {
        $.notify('Cliente deletado com sucesso!', 'success');
        this.fetchClients();
      },
      error: (error) => {
        $.notify(error.responseJSON.message, 'error');
      }
    });
  }
}

const api = new API(url);

function renderTable(Clients) {
  const tableBody = $('#table-body');
  tableBody.empty();

  for (let i = 0; i < Clients.length; i++) {
    const Client = Clients[i];
    const row = `
      <tr>
        <td>${Client.name}</td>
        <td>${Client.email}</td>
        <td>${Client.phone}</td>
        <td>
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" action="edit" data-bs-target="#modal" onclick="
          $('#name').val('${Client.name}');
           $('#email').val('${Client.email}');
            $('#phone').val('${Client.phone}');
              $('#id').val('${Client.id}');
            ">Edit</button>
          <button type="button" class="btn btn-danger btn-sm" onclick="deleteClients('${Client.id}')">Delete</button>
      </tr>              
    `;

    tableBody.append(row);
  }

  tableBody.fadeIn(500);
}

function renderPagination(meta) {
  const pagination = $('.pagination');
  pagination.empty();
  console.log(meta);
  const { page, pageSize, total, totalPages } = meta;

  const previous = `
    <li class="page-item ${page === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="api.setPage(${page - 1})">Previous</a>
    </li>
  `;
  pagination.append(previous);

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = `
      <li class="page-item ${page === i ? 'active' : ''}">
        <a class="page-link" href="#" onclick="api.setPage(${i})">${i}</a>
      </li>
    `;
    pagination.append(pageItem);
  }

  const next = `
    <li class="page-item ${page === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="api.setPage(${page + 1})">Next</a>
    </li>
  `;
  pagination.append(next);
}


$('#modal').on('hidden.bs.modal', function (e) {
  $('#name').val('');
  $('#email').val('');
  $('#phone').val('');
  $('#id').val('');
});

$('#modal').on('show.bs.modal', function (e) {
  const attr = e.relatedTarget.getAttribute('action');
  if (attr === 'edit') {
    $('.modal-title').text('Atualizar Cliente');
    $('button[type="submit"]').text('Atualizar');
  } else if (attr === 'add') {
    $('.modal-title').text('Adicionar Cliente');
    $('button[type="submit"]').text('Adicionar');
  }
});

$('#form').submit((event) => {
  event.preventDefault();

  const name = $('#name').val();
  const email = $('#email').val();
  const phone = $('#phone').val();
  const id = $('#id').val();

  if (id) {
    api.updateClients(id, name, email, phone)
  } else {
    api.createClients(name, email, phone);
  }
});

api.fetchClients();   
