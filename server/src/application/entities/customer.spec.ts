import { makeCustomer } from "@test/factory/customer-factory";

describe('Customer', () => {
  it('should be defined', () => {
    expect(makeCustomer()).toBeDefined();
  });

  it('should be not create a customer with invalid email', () => {
    // no empty email validation
    expect(() => {
      makeCustomer({ email: '' });
    }).toThrow();

    // invalid email validation
    expect(() => {
      makeCustomer({ email: 'invalid-email' });
    }).toThrow();
  });

  it('should be not create a customer with invalid phone', () => {
    // no empty phone validation
    expect(() => {
      makeCustomer({ phone: '' });
    }).toThrow();

    // min length validation
    expect(() => {
      makeCustomer({ phone: '123' });
    }).toThrow();

    // max length validation
    expect(() => {
      makeCustomer({ phone: '123456789012' });
    }).toThrow();

    // only numbers validation
    expect(() => {
      makeCustomer({ phone: '1234567890a' });
    }).toThrow();
  });

  it('should be not create a customer with invalid name', () => {
    // no empty name validation
    expect(() => {
      makeCustomer({ name: '' });
    }).toThrow();

    // min length validation
    expect(() => {
      makeCustomer({ name: 'jo' });
    }).toThrow();

    // max length validation
    expect(() => {
      makeCustomer({ name: 'j'.repeat(256) });
    }).toThrow();
  });
});

// Path: server/src/application/entities/customer.ts