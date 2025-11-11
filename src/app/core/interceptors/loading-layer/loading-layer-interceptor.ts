import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingLayerService } from '../../services/loading-layer/loading-layer.service';
import { finalize } from 'rxjs/operators';

export const loadingLayerInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingLayerService = inject(LoadingLayerService);
    loadingLayerService.show();
    return next(req).pipe(finalize(() => loadingLayerService.hide()));
};
