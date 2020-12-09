import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MembershipType } from '../customer.model';
import { MembershipService } from '../membership.service';
import { LoadMemberships, LoadMembershipsFailure, LoadMembershipsSuccess, MembershipActionType } from './membership.actions';

@Injectable()
export class MembershipEffects {

    @Effect()
    loadMemberships$: Observable<Action> = this.actions$.pipe(
        ofType(MembershipActionType.LOAD_MEMBERSHIPS),
        mergeMap((action: LoadMemberships) => {
            return this.membershipService.loadMemberships()
                .pipe(
                    map((memberships: Array<MembershipType>) => {
                        return new LoadMembershipsSuccess(memberships);
                    }),
                    catchError((error) => of(new LoadMembershipsFailure(error)))
                );
        })
    );

    constructor(private actions$: Actions, private membershipService: MembershipService) {

    }
}