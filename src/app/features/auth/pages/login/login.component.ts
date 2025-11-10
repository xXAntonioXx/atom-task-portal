import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../core/services/auth/auth';

@Component({
    selector: 'app-login',
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    authService = inject(AuthService);
    router = inject(Router);
    email = new FormControl('', [Validators.required, Validators.email]);

    async onSubmit() {
        try {
            await this.authService.login(this.email.value!);
            this.router.navigate(['/tasks/management']);
        } catch (error) {
            console.error('Login failed', error);
        }
    }
}
