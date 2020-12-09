import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import * as customerActions from '../state/customer.actions';

@Injectable()
export class CustomerEffect {

    @Effect()
    loadCustomers$: Observable<Action> = this.actions$.pipe(
        ofType(customerActions.CustomerActionTypes.LOAD_CUSTOMERS),
        mergeMap((action: customerActions.LoadCustomers) => {
            return this.customerService.getCustomers()
                .pipe(
                    map((customers: Array<Customer>) => {
                        return new customerActions.LoadCustomersSuccess(customers);
                    }),
                    catchError((error) => of(new customerActions.LoadCustomersFailure(error)))
                );
        })
    );

    @Effect()
    loadCustomer$: Observable<Action> = this.actions$.pipe(
        ofType(customerActions.CustomerActionTypes.LOAD_CUSTOMER),
        mergeMap((action: customerActions.LoadCustomer) => {
            return this.customerService.getCustomer(action.payload)
                .pipe(
                    map((customer: Customer) => {
                        return new customerActions.LoadCustomerSuccess(customer);
                    }),
                    catchError((error) => of(new customerActions.LoadCustomerFailure(error)))
                );
        })
    );

    @Effect()
    addCustomer$: Observable<Action> = this.actions$.pipe(
        ofType(customerActions.CustomerActionTypes.ADD_CUSTOMER),
        mergeMap((action: customerActions.AddCustomer) => {
            return this.customerService.addCustomer(action.payload)
                .pipe(
                    map((customer: Customer) => {
                        return new customerActions.AddCustomerSuccess(customer);
                    }),
                    catchError((error) => of(new customerActions.AddCustomerFailure(error)))
                );
        })
    );

    @Effect()
    editCustomer$: Observable<Action> = this.actions$.pipe(
        ofType(customerActions.CustomerActionTypes.EDIT_CUSTOMER),
        mergeMap((action: customerActions.EditCustomer) => {
            return this.customerService.editCustomer(action.payload)
                .pipe(
                    map((customer: Customer) => {
                        return new customerActions.EditCustomerSuccess({
                            id: customer.id,
                            changes: customer
                        });
                    }),
                    catchError((error) => of(new customerActions.EditCustomerFailure(error)))
                );
        })
    );

    @Effect()
    removeCustomer$: Observable<Action> = this.actions$.pipe(
        ofType(customerActions.CustomerActionTypes.REMOVE_CUSTOMER),
        mergeMap((action: customerActions.RemoveCustomer) => {
            return this.customerService.removeCustomer(action.payload)
                .pipe(
                    map(() => new customerActions.RemoveCustomerSuccess(action.payload)),
                    catchError((error) => of(new customerActions.EditCustomerFailure(error)))
                );
        })
    );

    constructor(
        private actions$: Actions,
        private customerService: CustomerService
    ) { }

}