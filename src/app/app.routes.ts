import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard-guard';
import { loginGuard } from './core/guards/login/login.guard-guard';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout-component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'tasks',
                loadChildren: () =>
                    import('./features/tasks').then((m) => m.routes),
                canActivate: [authGuard],
            },
            {
                path: '',
                redirectTo: '/auth/login',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth').then((m) => m.routes),
        canActivate: [loginGuard],
    },
    {
        path: '**',
        redirectTo: '/auth/login',
    },
];
