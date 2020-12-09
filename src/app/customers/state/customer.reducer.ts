import * as customerActions from './customer.actions';
import { Customer } from '../customer.model';
import * as fromRoot from '../../state/app.state';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { MembershipState } from './membership.reducer';

export interface CustomerState extends EntityState<Customer> {
    selectedCustomerId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    customers: CustomerState;
    memberships: MembershipState;
}

const customerAdaptor: EntityAdapter<Customer> = createEntityAdapter<Customer>();

const defaultCustomer: CustomerState = {
    entities: {},
    error: '',
    ids: [],
    loaded: false,
    loading: false,
    selectedCustomerId: null
};

export const initialState: CustomerState = customerAdaptor.getInitialState(defaultCustomer);

export function customerReducer(state = initialState, action: customerActions.CustomerAction): CustomerState {

    switch (action.type) {

        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
            return customerAdaptor.addMany(action.payload, {
                ...state,
                loaded: true,
                loading: false
            });
        }

        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAILURE: {
            return { ...state, entities: {}, loaded: false, loading: false, error: action.payload };
        }

        case customerActions.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
            return customerAdaptor.addOne(action.payload, {
                ...state,
                selectedCustomerId: action.payload.id
            });
        }

        case customerActions.CustomerActionTypes.LOAD_CUSTOMER_FAILURE: {
            return { ...state, error: action.payload };
        }

        case customerActions.CustomerActionTypes.ADD_CUSTOMER_SUCCESS: {
            return customerAdaptor.addOne(action.payload, state);
        }

        case customerActions.CustomerActionTypes.ADD_CUSTOMER_FAILURE: {
            return { ...state, error: action.payload };
        }

        case customerActions.CustomerActionTypes.EDIT_CUSTOMER_SUCCESS: {
            return customerAdaptor.updateOne(action.payload, state);
        }

        case customerActions.CustomerActionTypes.EDIT_CUSTOMER_FAILURE: {
            return { ...state, error: action.payload };
        }

        case customerActions.CustomerActionTypes.REMOVE_CUSTOMER_SUCCESS: {
            return customerAdaptor.removeOne(action.payload, state);
        }

        case customerActions.CustomerActionTypes.REMOVE_CUSTOMER_FAILURE: {
            return { ...state, error: action.payload };
        }

        default: {
            return state;
        }

    }

}

const getCustomerFeatureState = createFeatureSelector<CustomerState>('customers');

export const getCustomers = createSelector(getCustomerFeatureState, customerAdaptor.getSelectors().selectAll);
export const getCustomersLoading = createSelector(getCustomerFeatureState, (state: CustomerState) => state.loading);
export const getCustomersLoaded = createSelector(getCustomerFeatureState, (state: CustomerState) => state.loaded);
export const getError = createSelector(getCustomerFeatureState, (state: CustomerState) => state.error);
export const getCustomerId = createSelector(getCustomerFeatureState, (state: CustomerState) => state.selectedCustomerId);
export const getCurrentCustomer = createSelector(getCustomerFeatureState, getCustomerId, (state: CustomerState) => state.entities[state.selectedCustomerId]);
