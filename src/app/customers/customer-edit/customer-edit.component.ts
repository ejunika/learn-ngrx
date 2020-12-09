import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Customer } from '../customer.model';
import * as fromCustomer from '../state/customer.reducer';
import * as customerAction from '../state/customer.actions'

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customerFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.customerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      membership: ['', Validators.required],
      address: ['', Validators.required],
      id: null
    });

    const customer$: Observable<Customer> = this.store.select(fromCustomer.getCurrentCustomer);

    customer$.subscribe((currentCustomer: Customer) => {
      if (currentCustomer) {
        this.customerFormGroup.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id
        })
      }
    });

  }

  updateCustomer(): void {
    const customer: Customer = {
      name: this.customerFormGroup.get('name').value,
      phone: this.customerFormGroup.get('phone').value,
      address: this.customerFormGroup.get('address').value,
      membership: this.customerFormGroup.get('membership').value,
      id: this.customerFormGroup.get('id').value
    };
    this.store.dispatch(new customerAction.EditCustomer(customer));
    this.customerFormGroup.reset();
  }

}
