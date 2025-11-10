import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Auth, signInWithCustomToken } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http = inject(HttpClient);
    auth = inject(Auth);
    router = inject(Router);
    private url = `${environment.apiUrl}/auth`;

    async login(email: string) {
        const token = await firstValueFrom(
            this.http.post<string>(`${this.url}/login`, { email }),
        );
        await signInWithCustomToken(this.auth, token);
    }

    async logout() {
        await this.auth.signOut();
        this.router.navigate(['/auth/login']);
    }
}
