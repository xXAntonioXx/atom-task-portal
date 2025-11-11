import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Auth, signInWithCustomToken } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../../models/login-response.interface';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    httpService = inject(HttpClient);
    authService = inject(Auth);
    routerService = inject(Router);
    notificationService = inject(NotificationService);
    private url = `${environment.apiUrl}/auth`;

    async login(email: string) {
        try {
            const loginResponse = await firstValueFrom(
                this.httpService.post<LoginResponse>(`${this.url}/login`, {
                    email,
                }),
            );
            if (loginResponse.userExists) {
                await signInWithCustomToken(
                    this.authService,
                    loginResponse.token,
                );
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            this.notificationService.showMessage(
                'Login failed. Please try again.',
            );
            return false;
        }
    }

    async signup(email: string) {
        try {
            const signup = await firstValueFrom(
                this.httpService.post<LoginResponse>(`${this.url}/signup`, {
                    email,
                }),
            );
            await signInWithCustomToken(this.authService, signup.token);
        } catch (error) {
            console.error('Signup error:', error);
            this.notificationService.showMessage(
                'Signup failed. Please try again.',
            );
        }
    }

    async logout() {
        await this.authService.signOut();
        this.routerService.navigate(['/auth/login']);
    }
}
