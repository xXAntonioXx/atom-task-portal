import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../top-bar-component/top-bar-component';

@Component({
    selector: 'app-app-layout-component',
    imports: [RouterOutlet, TopBarComponent],
    templateUrl: './app-layout-component.html',
    styleUrl: './app-layout-component.scss',
})
export class AppLayoutComponent {}
