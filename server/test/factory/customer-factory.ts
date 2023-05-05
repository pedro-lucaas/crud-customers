import { Customer } from "@application/entities/customer";
import { faker } from "@faker-js/faker";

export function makeCustomer(overrides?: Partial<Customer>): Customer {
  return new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number("##########"),
    ...overrides,
  });
}