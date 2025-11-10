import { inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { from, map, take } from 'rxjs';

export const loginGuard: CanActivateFn = () => {
    const auth = inject(Auth);
    const router = inject(Router);

    return from(
        new Promise<boolean>((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(!user); // allow if not logged in
            });
        }),
    ).pipe(
        take(1),
        map((canAccess) => {
            if (!canAccess) router.navigate(['/tasks/management']);
            return canAccess;
        }),
    );
};
