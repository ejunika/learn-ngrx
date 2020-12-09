import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer, MembershipType } from '../customer.model';
import * as customerActions from '../state/customer.actions';
import * as membershipActions from '../state/membership.actions';
import * as fromCustomer from '../state/customer.reducer';
import * as fromMembership from '../state/membership.reducer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<Array<Customer>>;
  memberships$: Observable<Array<MembershipType>>;

  constructor(private store: Store<fromCustomer.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.store.dispatch(new membershipActions.LoadMemberships());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
    this.memberships$ = this.store.pipe(select(fromMembership.getAllMemberships));
    this.memberships$.subscribe((x) => {
      console.log(x);
    })
  }

  editCustomer(customer: Customer): void {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }

  deleteCustomer(customer: Customer): void {
    this.store.dispatch(new customerActions.RemoveCustomer(customer.id));
  }

}
