import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { authInterceptor } from './core/interceptors/auth/auth-interceptor';
import { provideStore } from '@ngrx/store';
import { taskManagementReducer } from './features/tasks/store/task-management/task-management.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loadTaskEffect } from './features/tasks/store/task-management/task-management.effects';
import { loadingLayerInterceptor } from './core/interceptors/loading-layer/loading-layer-interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([authInterceptor, loadingLayerInterceptor]),
        ),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideStore({ tasks: taskManagementReducer }),
        provideEffects({ loadTaskEffect }),
        provideStoreDevtools(),
    ],
};
