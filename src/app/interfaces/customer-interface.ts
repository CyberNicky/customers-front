export interface CustomerInterface {
  id: number;
  name: string;
  age: number;
  gender: string;
}

export type CreateCustomerType = Omit<CustomerInterface, 'id'>;
