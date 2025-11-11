import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SignupConfirmationComponent } from '../../components/signup-confirmation.component/signup-confirmation.component';
import { NotificationService } from '../../../../core/services/notification/notification.service';

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
    notificationService = inject(NotificationService);
    authService = inject(AuthService);
    router = inject(Router);
    readonly dialog = inject(MatDialog);

    email = new FormControl('', [Validators.required, Validators.email]);

    async onSubmit() {
        const loginSuccess = await this.authService.login(this.email.value!);
        if (loginSuccess) {
            this.router.navigate(['/tasks/management']);
            return;
        }
        this.openSignupDialog();
    }

    openSignupDialog() {
        const dialogRef = this.dialog.open(SignupConfirmationComponent);

        dialogRef.afterClosed().subscribe(async (accepted) => {
            if (!accepted) return;
            await this.authService.signup(this.email.value!);
            this.notificationService.showMessage(
                'Signup successful! You are now logged in.',
            );
            this.router.navigate(['/tasks/management']);
        });
    }
}
