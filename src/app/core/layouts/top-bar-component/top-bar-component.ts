import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { logoutSuccess } from '../../store/log-out/log-out.actions';

@Component({
    selector: 'app-top-bar-component',
    imports: [MatButton],
    templateUrl: './top-bar-component.html',
    styleUrl: './top-bar-component.scss',
})
export class TopBarComponent {
    authService = inject(AuthService);
    store = inject(Store);

    async onSignOut() {
        await this.authService.logout();
        this.store.dispatch(logoutSuccess());
    }
}
