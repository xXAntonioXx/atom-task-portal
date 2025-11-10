import { inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { from, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
    const auth = inject(Auth);
    const router = inject(Router);

    return from(
        new Promise<boolean>((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(!!user);
            });
        }),
    ).pipe(
        take(1),
        map((isLoggedIn) => {
            if (!isLoggedIn) {
                router.navigate(['/auth/login']);
                return false;
            }
            return true;
        }),
    );
};
