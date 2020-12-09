import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Customer } from '../customer.model';


export enum CustomerActionTypes {
    LOAD_CUSTOMERS = '[CUSTOMERS] load',
    LOAD_CUSTOMERS_SUCCESS = '[CUSTOMERS] load success',
    LOAD_CUSTOMERS_FAILURE = '[CUSTOMERS] load failure',

    LOAD_CUSTOMER = '[CUSTOMER] load',
    LOAD_CUSTOMER_SUCCESS = '[CUSTOMER] load success',
    LOAD_CUSTOMER_FAILURE = '[CUSTOMER] load failure',

    ADD_CUSTOMER = '[CUSTOMER] add',
    ADD_CUSTOMER_SUCCESS = '[CUSTOMER] add success',
    ADD_CUSTOMER_FAILURE = '[CUSTOMER] add failure',

    EDIT_CUSTOMER = '[CUSTOMER] edit',
    EDIT_CUSTOMER_SUCCESS = '[CUSTOMER] edit success',
    EDIT_CUSTOMER_FAILURE = '[CUSTOMER] edit failure',

    REMOVE_CUSTOMER = '[CUSTOMER] remove',
    REMOVE_CUSTOMER_SUCCESS = '[CUSTOMER] remove success',
    REMOVE_CUSTOMER_FAILURE = '[CUSTOMER] remove failure'
}

// Customers Load

export class LoadCustomers implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMERS;
}

export class LoadCustomersSuccess implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS;
    constructor(public payload: Array<Customer>) { }
}

export class LoadCustomersFailure implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMERS_FAILURE;
    constructor(public payload: string) { }
}


// Customer Load

export class LoadCustomer implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMER;
    constructor(public payload: string) {}
}

export class LoadCustomerSuccess implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMER_SUCCESS;
    constructor(public payload: Customer) { }
}

export class LoadCustomerFailure implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMER_FAILURE;
    constructor(public payload: string) { }
}

// Customer Add

export class AddCustomer implements Action {
    readonly type = CustomerActionTypes.ADD_CUSTOMER;
    constructor(public payload: Customer) {}
}

export class AddCustomerSuccess implements Action {
    readonly type = CustomerActionTypes.ADD_CUSTOMER_SUCCESS;
    constructor(public payload: Customer) { }
}

export class AddCustomerFailure implements Action {
    readonly type = CustomerActionTypes.ADD_CUSTOMER_FAILURE;
    constructor(public payload: string) { }
}

// Customer Remove

export class RemoveCustomer implements Action {
    readonly type = CustomerActionTypes.REMOVE_CUSTOMER;
    constructor(public payload: string) { }
}

export class RemoveCustomerSuccess implements Action {
    readonly type = CustomerActionTypes.REMOVE_CUSTOMER_SUCCESS;
    constructor(public payload: string) { }
}

export class RemoveCustomerFailure implements Action {
    readonly type = CustomerActionTypes.REMOVE_CUSTOMER_FAILURE;
    constructor(public payload: string) { }
}

// Customer Edit

export class EditCustomer implements Action {
    readonly type = CustomerActionTypes.EDIT_CUSTOMER;
    constructor(public payload: Customer) { }
}

export class EditCustomerSuccess implements Action {
    readonly type = CustomerActionTypes.EDIT_CUSTOMER_SUCCESS;
    constructor(public payload: Update<Customer>) { }
}

export class EditCustomerFailure implements Action {
    readonly type = CustomerActionTypes.EDIT_CUSTOMER_FAILURE;
    constructor(public payload: string) { }
}

export type CustomerAction = LoadCustomers
    | LoadCustomersSuccess
    | LoadCustomersFailure
    | LoadCustomer
    | LoadCustomerSuccess
    | LoadCustomerFailure
    | RemoveCustomer
    | RemoveCustomerSuccess
    | RemoveCustomerFailure
    | AddCustomer
    | AddCustomerSuccess
    | AddCustomerFailure
    | EditCustomer
    | EditCustomerSuccess
    | EditCustomerFailure;
