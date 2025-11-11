import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingLayerService } from '../../services/loading-layer/loading-layer.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loading-layer-component',
    imports: [MatProgressBarModule, CommonModule],
    templateUrl: './loading-layer-component.html',
    styleUrl: './loading-layer-component.scss',
})
export class LoadingLayerComponent {
    private loadingLayerService: LoadingLayerService =
        inject(LoadingLayerService);

    isLoading = this.loadingLayerService.getLoadingState();
}
