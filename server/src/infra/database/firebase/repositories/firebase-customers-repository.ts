import { CustomersRepository } from "@application/repositories/customers-repository";
import { FirebaseService } from "../firebase.service";
import { Customer } from "@application/entities/customer";
import { PAGE_SIZE, Pagination } from "@helpers/Pagination";
import { Injectable } from "@nestjs/common";
import { CustomerMapper } from "../mappers/customer-mapper";

@Injectable()
export class FirebaseCustomersRepository implements CustomersRepository {
  constructor(
    private readonly firestore: FirebaseService,
  ) { }

  async findCustomerById(customerId: string): Promise<Customer | undefined> {
    const customer = await this.firestore.collection('customers').doc(customerId).get();

    return CustomerMapper.toDomain(customer);
  }

  async findCustomerByEmail(email: string): Promise<Customer | undefined> {
    const customers = (await this.firestore.collection('customers').where('email', '==', email).limit(1).get()).docs[0];

    return CustomerMapper.toDomain(customers);
  }

  async save(customer: Customer): Promise<void> {
    await this.firestore.collection('customers').doc(customer.id).set(CustomerMapper.toFirestore(customer));
  }

  async delete(customerId: string): Promise<void> {
    await this.firestore.collection('customers').doc(customerId).delete();
  }

  async findMany(page: number): Promise<Pagination<Customer>> {
    const total = (await this.firestore.collection('customers').count().get()).data().count;
    const customers = await this.firestore.collection('customers').offset((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).get();

    const pagination = new Pagination<Customer>({
      items: customers.docs.map(customer => CustomerMapper.toDomain(customer)),
      total,
      page,
      limit: PAGE_SIZE,
    });

    return pagination;
  }
}