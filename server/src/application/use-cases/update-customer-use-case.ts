import { CustomersRepository } from "@application/repositories/customers-repository";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Err } from "../errors/err";

export type UpdateCustomerRequest = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
};

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) { }

  async execute(request: UpdateCustomerRequest): Promise<void> {
    const { name, email, phone } = request;
    if (!name && !email && !phone) {
      throw new Err("Nenhum campo foi informado", HttpStatus.BAD_REQUEST);
    }
    const customer = await this.customersRepository.findCustomerById(request.id);
    if (!customer) {
      throw new Err("Cliente não encontrado", HttpStatus.NOT_FOUND);
    }


    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;

    await this.customersRepository.save(customer);
  }
}