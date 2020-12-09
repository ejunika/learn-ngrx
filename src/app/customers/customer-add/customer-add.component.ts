import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { v1 } from 'uuid';
import { Customer } from '../customer.model';
import * as customerAction from '../state/customer.actions';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  customerFormGroup: FormGroup;
  memberships: Array<string>;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.memberships = 'Basic, Pro, Gold, Platinum'.split(', ');
    this.customerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      membership: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  addCustomer(): void {
    const customer: Customer = {
      name: this.customerFormGroup.get('name').value,
      phone: this.customerFormGroup.get('phone').value,
      address: this.customerFormGroup.get('address').value,
      membership: this.customerFormGroup.get('membership').value,
      id: v1()
    };
    this.store.dispatch(new customerAction.AddCustomer(customer));
    this.customerFormGroup.reset();
  }

}
