import { createReducer, on } from '@ngrx/store';
import {
    loadTasks,
    loadTasksFailure,
    loadTasksSuccess,
} from '../task-management/task-management.actions';
import { Task } from '../../models/tasks.model';

export interface TaskManagementState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

export const initialState: TaskManagementState = {
    tasks: [],
    loading: false,
    error: null,
};

export const taskManagementReducer = createReducer(
    initialState,
    on(loadTasks, (state) => ({
        ...state,
        loading: true,
    })),
    on(loadTasksSuccess, (state, { tasks }) => ({
        ...state,
        tasks,
        loading: false,
    })),
    on(loadTasksFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
);
