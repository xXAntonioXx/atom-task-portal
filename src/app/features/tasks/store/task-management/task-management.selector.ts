import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskManagementState } from './task-management.reducer';

export const selectTaskManagementState =
    createFeatureSelector<TaskManagementState>('tasks');

export const selectTasks = createSelector(
    selectTaskManagementState,
    (state) => {
        return state.tasks;
    },
);

export const selectLoading = createSelector(
    selectTaskManagementState,
    (state) => state.loading,
);

export const selectError = createSelector(
    selectTaskManagementState,
    (state) => state.error,
);
