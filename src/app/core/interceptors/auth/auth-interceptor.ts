import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { environment } from '../../../../environments/environment';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(Auth);

    const endpointAuthNotRequired = ['/auth/login'].includes(
        req.url.replace(environment.apiUrl, ''),
    );
    if (endpointAuthNotRequired) {
        return next(req);
    }

    return from(auth.currentUser?.getIdToken() ?? Promise.resolve(null)).pipe(
        switchMap((token) => {
            if (!token) {
                return next(req);
            }
            const cloned = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            });
            return next(cloned);
        }),
    );
};
