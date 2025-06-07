import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private tenantIdSubject = new BehaviorSubject<string>('');
  public tenantId$ = this.tenantIdSubject.asObservable();

  constructor() {
    this.initializeTenantId();
  }


  private initializeTenantId() {
    const tenandId = this.getTenantIdFromEnvironment();

    this.tenantIdSubject.next(tenandId);
  }


  private getTenantIdFromEnvironment(): string {
    return 'demo-tenant'; 
  }
}
