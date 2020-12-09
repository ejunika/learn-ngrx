import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { v1 } from 'uuid';
import { Customer } from './customer.model';

const LATENCY = 2000;

let CUSTOMERS: Array<Customer> = [
  {
    name: 'Shanur Hussain',
    phone: '9876567876',
    address: '345/5, Ambala Cantt',
    membership: 'Pro',
    id: v1()
  },
  {
    name: 'Ayan Hussain',
    phone: '9879877876',
    address: '345/5, Ambala Cantt',
    membership: 'Basic',
    id: v1()
  }
];

const MEMBERSHIPS = 'Basic, Pro, Gold, Platinum'.split(', ');

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers(): Observable<Array<Customer>> {
    return of(CUSTOMERS).pipe(delay(LATENCY));
  }

  getCustomer(id: string): Observable<Customer> {
    return of(CUSTOMERS.find(c => c.id === id)).pipe(delay(LATENCY));
  }

  addCustomer(customer: Customer): Observable<Customer> {
    let customers = [...CUSTOMERS];
    customers.push(customer);
    CUSTOMERS = customers;
    return of(customer).pipe(delay(LATENCY));
  }

  editCustomer(customer: Customer): Observable<Customer> {
    let customers = [...CUSTOMERS];
    CUSTOMERS = customers.map(c => {
      if (c.id === customer.id) {
        c = { ...customer };
      }
      return c;
    });
    return of(customer).pipe(delay(LATENCY));
  }

  removeCustomer(id: string): Observable<boolean> {
    CUSTOMERS = CUSTOMERS.filter(c => c.id !== id);
    return of(true).pipe(delay(LATENCY));
  }

  getMemberships(): Observable<Array<string>> {
    return of(MEMBERSHIPS);
  }

}
