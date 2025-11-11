import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Auth, signInWithCustomToken } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../../models/login-response.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http = inject(HttpClient);
    auth = inject(Auth);
    router = inject(Router);
    private url = `${environment.apiUrl}/auth`;

    async login(email: string) {
        const loginResponse = await firstValueFrom(
            this.http.post<LoginResponse>(`${this.url}/login`, { email }),
        );
        if (loginResponse.userExists) {
            await signInWithCustomToken(this.auth, loginResponse.token);
            return true;
        }
        return false;
    }

    async signup(email: string) {
        const signup = await firstValueFrom(
            this.http.post<LoginResponse>(`${this.url}/signup`, { email }),
        );
        await signInWithCustomToken(this.auth, signup.token);
    }

    async logout() {
        await this.auth.signOut();
        this.router.navigate(['/auth/login']);
    }
}
