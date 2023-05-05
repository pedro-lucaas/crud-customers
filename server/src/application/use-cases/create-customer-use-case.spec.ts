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
    await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'teste123@gmail.com',
      phone: '11999999999',
    });

    expect(repository.customers.length).toBe(1);
    expect(repository.customers[0].name).toBe('John Doe');
    expect(repository.customers[0].email).toBe('teste123@gamil.com');
    expect(repository.customers[0].phone).toBe('11999999999');
  });
});
