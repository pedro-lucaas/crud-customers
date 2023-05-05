import { makeCustomer } from "@test/factory/customer-factory";
import { UpdateCustomerUseCase } from "./update-customer-use-case";
import { InMemoryCustomersRepository } from "@test/repositories/in-memory-customers-repository";

describe('Update Customer Use Case', () => {
  let updateCustomerUseCase: UpdateCustomerUseCase;
  let repository: InMemoryCustomersRepository;

  beforeEach(() => {
    repository = new InMemoryCustomersRepository();
    updateCustomerUseCase = new UpdateCustomerUseCase(repository);
  });

  it('should be able to update a customer', async () => {
    const customer = makeCustomer();

    repository.customers.push(customer);

    await updateCustomerUseCase.execute({
      id: customer.id,
      email: 'newemail@gmail.com',
      name: 'new name',
      phone: '1188888888'
    });

    expect(repository.customers.length).toBe(1);
    expect(repository.customers[0].email).toBe('newemail@gmail.com');
    expect(repository.customers[0].name).toBe('new name');
    expect(repository.customers[0].phone).toBe('1188888888');
  });

  it('should not be able to update a customer that does not exist', async () => {
    await expect(updateCustomerUseCase.execute({
      id: '123',
      name: 'new name'
    })).rejects.toThrow();
  });
});