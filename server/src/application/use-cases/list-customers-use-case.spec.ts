import { Customer } from "@application/entities/customer";
import { InMemoryCustomersRepository } from "@test/repositories/in-memory-customers-repository";
import { ListCustomersUseCase } from "./list-customers-use-case";
import { makeCustomer } from "@test/factory/customer-factory";

describe('List Customers Use Case', () => {
  let listCustomersUseCase: ListCustomersUseCase;
  let repository: InMemoryCustomersRepository;

  beforeEach(() => {
    repository = new InMemoryCustomersRepository();
    listCustomersUseCase = new ListCustomersUseCase(repository);
  });

  it('should be able to list all customers', async () => {
    const customer1 = makeCustomer();
    const customer2 = makeCustomer();
    const customer3 = makeCustomer();

    repository.customers.push(customer1);
    repository.customers.push(customer2);
    repository.customers.push(customer3);

    const customers = await listCustomersUseCase.execute();

    expect(customers.items.length).toBe(3);
    expect(customers.items[0]).toBeInstanceOf(Customer);
    expect(customers.items[1]).toBeInstanceOf(Customer);
    expect(customers.items[2]).toBeInstanceOf(Customer);
  });
});
