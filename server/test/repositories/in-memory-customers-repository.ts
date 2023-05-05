import { Customer } from "@application/entities/customer";
import { Pagination } from "@helpers/Pagination";
import { CustomersRepository } from "@application/repositories/customers-repository";

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[] = [];

  async findCustomerById(customerId: string): Promise<Customer> {
    return this.customers.find(customer => customer.id === customerId);
  }

  async findCustomerByEmail(email: string): Promise<Customer> {
    return this.customers.find(customer => customer.email === email);
  }

  async save(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex(item => item.id === customer.id);
    if (customerIndex >= 0) {
      this.customers[customerIndex] = customer;
      return;
    } else {
      this.customers.push(customer);
    }
  }

  async delete(customerId: string): Promise<void> {
    this.customers = this.customers.filter(customer => customer.id !== customerId);
  }

  async findMany(page: number): Promise<Pagination<Customer>> {
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return new Pagination<Customer>({
      items: this.customers.slice(start, end),
      total: this.customers.length,
      page,
      limit: pageSize,
    }
    );
  }
}