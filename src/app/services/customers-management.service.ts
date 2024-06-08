import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import {
  CreateCustomerType,
  CustomerInterface,
} from '../interfaces/customer-interface';

@Injectable({
  providedIn: 'root',
})
export class CustomersManagementService {
  constructor(private http: HttpClient) {}
  getCustomers(filters?: { name?: string; age?: string; gender?: string }) {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(
        ([key, value]) => (params = params.append(key, value))
      );
    }
    return this.http.get<CustomerInterface[]>(environment.api + `customers`, {
      params,
    });
  }

  updateCustomers(id: number, data: CreateCustomerType) {
    return this.http.patch(environment.api + `customers/${id}`, data);
  }

  createCustomers(data: CreateCustomerType) {
    return this.http.post(environment.api + `customers`, data);
  }

  deleteCustomers(id: number) {
    return this.http.delete(environment.api + `customers/${id}`);
  }
  getCustomer(id: number) {
    return this.http.get<CustomerInterface>(
      environment.api + `customers/${id}`
    );
  }
}
