import { InMemoryCustomersRepository } from "@test/repositories/in-memory-customers-repository";
import { DeleteCustomerUseCase } from "./delete-customer-use-case";
import { Customer } from "@application/entities/customer";

describe('Delete Customer Use Case', () => {
  let deleteCustomerUseCase: DeleteCustomerUseCase;
  let repository: InMemoryCustomersRepository;

  beforeEach(() => {
    repository = new InMemoryCustomersRepository();
    deleteCustomerUseCase = new DeleteCustomerUseCase(repository);
  });

  it('should be able to delete a customer', async () => {
    const customer = new Customer({
      name: 'John Doe',
      email: 'teste123@gamil.com',
      phone: '11999999999',
    }, 'customer-id');

    repository.customers.push(customer);

    await deleteCustomerUseCase.execute({ id: customer.id });

    expect(repository.customers.length).toBe(0);
  });
});
