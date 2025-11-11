import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-top-bar-component',
    imports: [MatButton],
    templateUrl: './top-bar-component.html',
    styleUrl: './top-bar-component.scss',
})
export class TopBarComponent {
    authService = inject(AuthService);

    async onSignOut() {
        await this.authService.logout();
    }
}
