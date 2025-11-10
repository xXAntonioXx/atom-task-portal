import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingLayerComponent } from './core/layouts/loading-layer-component/loading-layer-component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoadingLayerComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('atom-task-portal');
}
