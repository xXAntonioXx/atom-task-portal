import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../../services/tasks.service';
import {
    loadTasks,
    loadTasksSuccess,
    loadTasksFailure,
} from './task-management.actions';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

export const loadTaskEffect = createEffect(
    (actions$ = inject(Actions), taskService = inject(TasksService)) => {
        console.log('Effect initialized');
        return actions$.pipe(
            ofType(loadTasks),
            mergeMap(() =>
                taskService.getTasks().pipe(
                    map((tasks) => loadTasksSuccess({ tasks })),
                    catchError((error) =>
                        of(loadTasksFailure({ error: error.message })),
                    ),
                ),
            ),
        );
    },
    { functional: true },
);
