import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'management',
        loadComponent: () =>
            import('./pages/tasks-management/tasks-management').then(
                (m) => m.TasksManagement,
            ),
    },
    {
        path: '**',
        redirectTo: 'management',
    },
];
