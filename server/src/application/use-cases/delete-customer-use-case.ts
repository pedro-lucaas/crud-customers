import { CustomersRepository } from "@application/repositories/customers-repository";

export type DeleteCustomerRequest = {
  id: string;
};

export class DeleteCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) { }

  async execute(request: DeleteCustomerRequest): Promise<void> {
    const customer = await this.customersRepository.findCustomerById(request.id);
    if (!customer) {
      throw new Error("Cliente não encontrado");
    }

    await this.customersRepository.delete(customer.id);
  }
}