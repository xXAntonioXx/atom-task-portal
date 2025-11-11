import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';

@Component({
    selector: 'app-signup-confirmation.component',
    imports: [
        MatButtonModule,
        MatDialogContent,
        MatDialogActions,
        MatDialogTitle,
    ],
    templateUrl: './signup-confirmation.component.html',
    styleUrl: './signup-confirmation.component.scss',
})
export class SignupConfirmationComponent {
    readonly dialogRef = inject(MatDialogRef<SignupConfirmationComponent>);

    onDecline() {
        this.dialogRef.close(false);
    }

    onConfirm() {
        this.dialogRef.close(true);
    }
}
