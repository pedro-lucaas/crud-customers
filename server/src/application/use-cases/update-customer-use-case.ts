import { CustomersRepository } from "@application/repositories/customers-repository";

export type UpdateCustomerRequest = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
};

export class UpdateCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) { }

  async execute(request: UpdateCustomerRequest): Promise<void> {
    const customer = await this.customersRepository.findCustomerById(request.id);
    if (!customer) {
      throw new Error("Cliente não encontrado");
    }

    const { name, email, phone } = request;

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;

    await this.customersRepository.save(customer);
  }
}