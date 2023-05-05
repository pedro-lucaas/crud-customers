import { CustomersRepository } from "@application/repositories/customers-repository";
import { FirebaseService } from "../firebase.service";
import { Customer } from "@application/entities/customer";
import { PAGE_SIZE, Pagination } from "@helpers/Pagination";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FirebaseCustomersRepository implements CustomersRepository {
  constructor(
    private readonly firestore: FirebaseService,
  ) { }

  async findCustomerById(customerId: string): Promise<Customer | undefined> {
    const customer = await this.firestore.collection('customers').doc(customerId).get();

    if (!customer.exists) {
      return undefined;
    }
    return new Customer({
      name: customer.data().name,
      email: customer.data().email,
      phone: customer.data().phone,
    }, customer.id);
  }

  async findCustomerByEmail(email: string): Promise<Customer | undefined> {
    const customers = await this.firestore.collection('customers').where('email', '==', email).limit(1).get();

    if (customers.empty) {
      return undefined;
    }
    return new Customer({
      name: customers.docs[0].data().name,
      email: customers.docs[0].data().email,
      phone: customers.docs[0].data().phone,
    }, customers.docs[0].id);
  }

  async save(customer: Customer): Promise<void> {
    await this.firestore.collection('customers').doc(customer.id).set({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
  }

  async delete(customerId: string): Promise<void> {
    await this.firestore.collection('customers').doc(customerId).delete();
  }

  async findMany(page: number): Promise<Pagination<Customer>> {
    const total = (await this.firestore.collection('customers').count().get()).data().count;

    const customers = await this.firestore.collection('customers').offset((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).get();

    const pagination = new Pagination<Customer>(
      customers.docs.map(customer => new Customer({
        name: customer.data().name,
        email: customer.data().email,
        phone: customer.data().phone,
      }, customer.id)),
      total,
      page,
      PAGE_SIZE,
    );

    return pagination;
  }
}