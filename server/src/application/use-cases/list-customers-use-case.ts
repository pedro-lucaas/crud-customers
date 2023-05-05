import { Pagination } from "@helpers/Pagination";
import { Customer } from "../entities/customer";
import { CustomersRepository } from "../repositories/customers-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListCustomersUseCase {
  constructor(private readonly customersRepository: CustomersRepository) { }

  async execute(page: number = 1): Promise<Pagination<Customer>> {
    const customers = await this.customersRepository.findMany(page);
    return customers;
  }
}