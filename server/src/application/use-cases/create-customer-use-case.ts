import { Customer } from "@application/entities/customer";
import { CustomersRepository } from "@application/repositories/customers-repository";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Err } from "../errors/err";

export type CreateCustomerRequest = {
  name: string;
  email: string;
  phone: string;
};

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) { }

  async execute(customer: CreateCustomerRequest): Promise<void> {
    const newCustomer = new Customer(customer);

    const customerAlreadyExists = await this.customersRepository.findCustomerByEmail(customer.email);
    if (customerAlreadyExists) {
      throw new Err("Endereço de email já está em uso", HttpStatus.CONFLICT);
    }

    await this.customersRepository.save(newCustomer);
  }
}