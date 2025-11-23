import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskEditModal } from '../../components/task-edit-modal/task-edit-modal';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '../../models/tasks.model';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { select, Store } from '@ngrx/store';
import { selectTasks } from '../../store/task-management/task-management.selector';
import { loadTasks } from '../../store/task-management/task-management.actions';
import { TasksService } from '../../services/tasks.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-tasks-management',
    imports: [
        MatTableModule,
        DatePipe,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
    ],
    templateUrl: './tasks-management.html',
    styleUrl: './tasks-management.scss',
})
export class TasksManagement implements OnInit {
    private store = inject(Store<{ tasks: Task[] }>);
    readonly notificationService = inject(NotificationService);
    readonly tasksService = inject(TasksService);
    readonly dialogService = inject(MatDialog);

    displayedColumns: string[] = ['completed', 'title', 'createdAt'];
    tasks$ = this.store.pipe(select(selectTasks));

    ngOnInit() {
        this.store.dispatch(loadTasks());
    }

    openTaskFormModal() {
        const dialogRef = this.dialogService.open(TaskEditModal, {
            data: { title: '', description: '' },
        });
        dialogRef.afterClosed().subscribe((newTask) => {
            if (!newTask) return;
            this.notificationService.showMessage('Task created successfully');
            this.store.dispatch(loadTasks());
        });
    }

    toggleTaskCompletion(checked: boolean, task: Task) {
        const updatedTask = { ...task, completed: checked };
        this.tasksService.updateTask(updatedTask).subscribe(() => {
            this.store.dispatch(loadTasks());
            this.notificationService.showMessage('Task updated successfully');
        });
    }

    taskSelected(task: Task) {
        const dialogRef = this.dialogService.open(TaskEditModal, {
            data: {
                title: task.title,
                description: task.description,
                id: task.id,
            },
        });
        dialogRef.afterClosed().subscribe((newTask) => {
            const message = newTask
                ? 'Task updated successfully'
                : 'Task deleted successfully';
            this.notificationService.showMessage(message);
            this.store.dispatch(loadTasks());
        });
    }
}
