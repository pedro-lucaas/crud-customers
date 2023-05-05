import { Customer } from "@application/entities/customer";
import { CustomersRepository } from "@application/repositories/customers-repository";

export type CreateCustomerRequest = {
  name: string;
  email: string;
  phone: string;
};

export class CreateCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) { }

  async execute(customer: CreateCustomerRequest): Promise<void> {
    const customerAlreadyExists = await this.customersRepository.findCustomerByEmail(customer.email);
    if (customerAlreadyExists) {
      throw new Error("Customer already exists");
    }

    const newCustomer = new Customer(customer);
    await this.customersRepository.save(newCustomer);
  }
}