import { Customer } from "@application/entities/customer";

export class CustomerMapper {
  static toDomain(raw: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>): Customer | undefined {
    if (!raw.exists) {
      return undefined;
    }
    return new Customer({
      name: raw.data().name,
      email: raw.data().email,
      phone: raw.data().phone,
    }, raw.id);
  }

  static toFirestore(customer: Customer): FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData> {
    return {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    };
  }
}