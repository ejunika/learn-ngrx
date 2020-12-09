import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';

import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

import { customerReducer } from './state/customer.reducer';
import { membershipReducer } from './state/membership.reducer';
import { CustomerEffect } from './state/customer.effects';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MembershipEffects } from './state/membership.effects';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent
  }
];

@NgModule({
  declarations: [CustomerComponent, CustomerAddComponent, CustomerEditComponent, CustomerListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('customers', customerReducer),
    StoreModule.forFeature('memberships', membershipReducer),
    EffectsModule.forFeature([CustomerEffect, MembershipEffects]),
    RouterModule.forChild(routes)
  ]
})
export class CustomersModule { }
