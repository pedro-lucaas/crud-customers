import { randomUUID } from "crypto";
import { ICustomer, customerSchema } from "./schema";
import { fieldsValidation } from "@application/utils/fields-validation";

export class Customer {
  private _customerId: string;
  private props: ICustomer;

  private set(props: Partial<ICustomer>) {
    this.props = fieldsValidation<ICustomer>(customerSchema, { ...this.props, ...props });
  }

  constructor(props: ICustomer, customerId?: string) {
    this._customerId = customerId ?? randomUUID();
    this.set(props);
  }

  get id(): string {
    return this._customerId;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string {
    return this.props.phone;
  }

  set name(name: string) {
    this.set({ name });
  }

  set email(email: string) {
    this.set({ email });
  }

  set phone(phone: string) {
    this.set({ phone });
  }
}