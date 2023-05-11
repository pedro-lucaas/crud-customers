import { Customer } from "@application/entities/customer";

export class CustomerViewModel {
  static toHttp(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    };
  }
}