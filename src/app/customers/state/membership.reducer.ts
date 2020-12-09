import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MembershipType } from '../customer.model';
import * as membership from './membership.actions';

export interface MembershipState extends EntityState<MembershipType> {
    selectedMembershipTypeId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

const membershipAdaptor: EntityAdapter<MembershipType> = createEntityAdapter<MembershipType>();

const defaultMembership: MembershipState = {
    entities: {},
    error: '',
    ids: [],
    loaded: false,
    loading: false,
    selectedMembershipTypeId: null
}

export const initialMembershipState: MembershipState = membershipAdaptor.getInitialState(defaultMembership);

export function membershipReducer(state = initialMembershipState, action: membership.MembershipActions): MembershipState {
    switch (action.type) {
        case membership.MembershipActionType.LOAD_MEMBERSHIPS_SUCCESS: {
            return membershipAdaptor.addMany(action.payload, {
                ...state,
                loaded: true,
                loading: false
            });
        }
        case membership.MembershipActionType.LOAD_MEMBERSHIPS_FAILURE: {
            return { ...state, loading: false, loaded: false, error: action.payload };
        }
        default: {
            return state;
        }
    }
}

const membershipsFeatureSelector = createFeatureSelector('memberships');

export const getAllMemberships = createSelector(membershipsFeatureSelector, membershipAdaptor.getSelectors().selectAll);