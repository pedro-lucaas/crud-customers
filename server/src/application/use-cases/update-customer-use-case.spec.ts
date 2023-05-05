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
      email: 'newemail@gmail.com'
    });

    expect(repository.customers.length).toBe(1);
    expect(repository.customers[0].email).toBe('newemail@gmail.com');
  });
});