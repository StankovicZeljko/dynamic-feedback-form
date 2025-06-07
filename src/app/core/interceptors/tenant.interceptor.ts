import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TenantService } from '../services/tenant.service';

export const tenantInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:HttpHandlerFn) => {
  const tenantService = inject(TenantService);
  let tenantId = tenantService.getCurrentTenantId();
  
  if (tenantId) {
    req = req.clone({
      setHeaders: {
        'X-Tenant-ID': tenantId
      }
    });
  }

  return next(req);
};
