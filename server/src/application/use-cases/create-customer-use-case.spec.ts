import { InMemoryCustomersRepository } from "@test/repositories/in-memory-customers-repository";
import { CreateCustomerUseCase } from "./create-customer-use-case";

describe('Create Customer Use Case', () => {
  let createCustomerUseCase: CreateCustomerUseCase;
  let repository: InMemoryCustomersRepository;

  beforeEach(() => {
    repository = new InMemoryCustomersRepository();
    createCustomerUseCase = new CreateCustomerUseCase(repository);
  });

  it('should be able to create a new customer', async () => {
    const name = 'John Doe';
    const email = 'teste123@gmail.com';
    const phone = '11999999999';

    await createCustomerUseCase.execute({ name, email, phone });

    expect(repository.customers.length).toBe(1);
    expect(repository.customers[0].name).toBe(name);
    expect(repository.customers[0].email).toBe(email);
    expect(repository.customers[0].phone).toBe(phone);
  });
});
