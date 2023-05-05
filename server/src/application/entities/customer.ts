import { randomUUID } from "crypto";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string().min(3).max(255).nonempty(),
  email: z.string().email().nonempty(),
  phone: z.string().min(10).max(11).nonempty().refine((value) => {
    return !isNaN(Number(value));
  })
});

type ICustomer = z.infer<typeof customerSchema>;

export const validateCustomer = (data: unknown): ICustomer => {
  const customer = customerSchema.parse(data) as ICustomer;
  return customer;
};

export class Customer {
  private _customerId: string;
  private props: ICustomer;

  private set(props: Partial<ICustomer>) {
    this.props = { ...this.props, ...props };
    validateCustomer(this.props);
  }

  constructor(props: ICustomer, customerId?: string) {
    this._customerId = customerId ?? randomUUID();
    this.props = props;
    validateCustomer(this.props);
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