import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/tasks.model';

export const loadTasks = createAction('[Task Management] Load Tasks');
export const loadTasksSuccess = createAction(
    '[Task Management] Load Tasks Success',
    props<{ tasks: Task[] }>(),
);
export const loadTasksFailure = createAction(
    '[Task Management] Load Tasks Failure',
    props<{ error: string }>(),
);
