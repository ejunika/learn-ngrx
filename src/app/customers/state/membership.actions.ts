import { Action } from '@ngrx/store';
import { MembershipType } from '../customer.model';

export enum MembershipActionType {
    LOAD_MEMBERSHIPS = '[MEMBERSHIPS] load',
    LOAD_MEMBERSHIPS_SUCCESS = '[MEMBERSHIPS] load success',
    LOAD_MEMBERSHIPS_FAILURE = '[MEMBERSHIPS] load failure'
}

export class LoadMemberships implements Action {
    readonly type = MembershipActionType.LOAD_MEMBERSHIPS;
    constructor() { }
}

export class LoadMembershipsSuccess implements Action {
    readonly type = MembershipActionType.LOAD_MEMBERSHIPS_SUCCESS;
    constructor(public payload: Array<MembershipType>) { }
}

export class LoadMembershipsFailure implements Action {
    readonly type = MembershipActionType.LOAD_MEMBERSHIPS_FAILURE;
    constructor(public payload: string) { }
}

export type MembershipActions = LoadMemberships | LoadMembershipsSuccess | LoadMembershipsFailure;
