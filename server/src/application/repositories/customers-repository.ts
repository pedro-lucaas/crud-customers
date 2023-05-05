import { Pagination } from "@helpers/Pagination";
import { Customer } from "../entities/customer";

export abstract class CustomersRepository {
  abstract findCustomerById(customerId: string): Promise<Customer | undefined>;
  abstract findCustomerByEmail(email: string): Promise<Customer | undefined>;
  abstract save(customer: Customer): Promise<void>;
  abstract delete(customerId: string): Promise<void>;
  abstract findMany(page: number): Promise<Pagination<Customer>>;
}