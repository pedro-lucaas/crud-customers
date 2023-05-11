const url = 'http://localhost:3000/customers';


function fetchClientss() {
  $.ajax({
    url,
    method: 'GET',
    success: (data) => {
      renderTable(data.items);
    },
    error: (error) => {
      $.notify(error.responseJSON.message, 'error');
    }
  });
}

function createClients(name, email, phone) {
  const data = { name, email, phone };

  $.ajax({
    url,
    method: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: () => {
      fetchClientss();
    },
    error: (error) => {
      $.notify(error.responseJSON.message, 'error');
    }
  });
}

function updateClients(id, name, email) {
  const data = { name, email };

  $.ajax({
    url: `${url}/${id}`,
    method: 'PUT',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: () => {
      fetchClientss();
    },
    error: (error) => {
      $.notify(error.responseJSON.message, 'error');
    }
  });
}

function deleteClients(id) {
  $.ajax({
    url: `${url}/${id}`,
    method: 'DELETE',
    success: () => {
      fetchClientss();
    },
    error: (error) => {
      $.notify(error.responseJSON.message, 'error');
    }
  });
}

function renderTable(Clientss) {
  const tableBody = $('#table-body');
  tableBody.empty();

  for (let i = 0; i < Clientss.length; i++) {
    const Clients = Clientss[i];
    const row = `
      <tr>
        <td>${Clients.name}</td>
        <td>${Clients.email}</td>
        <td>${Clients.phone}</td>
        <td>
          <button type="button" class="btn btn-danger btn-sm" onclick="deleteClients('${Clients.id}')">Delete</button>
        </td>
      </tr>
    `;

    tableBody.append(row);
  }
}

$('#form').submit((event) => {
  event.preventDefault();

  const name = $('#name').val();
  const email = $('#email').val();
  const phone = $('#phone').val();

  createClients(name, email, phone);

  $('#name').val('');
  $('#email').val('');
  $('#phone').val('');
});

fetchClientss();
