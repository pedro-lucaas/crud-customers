import { CustomersRepository } from "@application/repositories/customers-repository";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Err } from "../errors/err";

export type DeleteCustomerRequest = {
  id: string;
};

@Injectable()
export class DeleteCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) { }

  async execute(request: DeleteCustomerRequest): Promise<void> {
    const customer = await this.customersRepository.findCustomerById(request.id);
    if (!customer) {
      throw new Err("Cliente não encontrado", HttpStatus.NOT_FOUND);
    }

    await this.customersRepository.delete(customer.id);
  }
}