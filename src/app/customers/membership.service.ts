import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v1 } from 'uuid';
import { MembershipType } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor() { }

  loadMemberships(): Observable<Array<MembershipType>> {
    return of([
      {
        name: 'Basic',
        id: v1()
      },
      {
        name: 'Pro',
        id: v1()
      },
      {
        name: 'Gold',
        id: v1()
      },
      {
        name: 'Platinum',
        id: v1()
      }
    ]);
  }

}
