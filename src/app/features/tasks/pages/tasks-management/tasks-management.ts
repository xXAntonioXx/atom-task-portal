import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private ngbModal = inject(NgbModal);
    private store = inject(Store<{ tasks: Task[] }>);
    private notificationService = inject(NotificationService);
    private tasksService = inject(TasksService);

    displayedColumns: string[] = ['completed', 'title', 'createdAt'];
    tasks$ = this.store.pipe(select(selectTasks));

    ngOnInit() {
        this.store.dispatch(loadTasks());
    }

    openTaskFormModal() {
        const modalRef = this.ngbModal.open(TaskEditModal);
        modalRef.componentInstance.taskAction.subscribe(() => {
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
        const modalRef = this.ngbModal.open(TaskEditModal);
        modalRef.componentInstance.setTask(task);
        modalRef.componentInstance.taskAction.subscribe((task?: Task) => {
            const message = task
                ? 'Task updated successfully'
                : 'Task deleted successfully';
            this.notificationService.showMessage(message);
            this.store.dispatch(loadTasks());
        });
    }
}
