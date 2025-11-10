import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/tasks.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-task-edit-modal',
    imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './task-edit-modal.html',
    styleUrl: './task-edit-modal.scss',
})
export class TaskEditModal {
    private taskService = inject(TasksService);
    private fb = inject(FormBuilder);
    private _snackBar = inject(MatSnackBar);
    private ngbModal = inject(NgbModal);

    form: FormGroup = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
    });

    @Input() task?: Task;
    @Output() taskAction = new EventEmitter<Task>();

    setTask(task: Task) {
        this.task = task;
        if (this.form) {
            this.form.patchValue(this.task);
        }
    }

    onSubmit() {
        const task = {
            ...this.form.value,
        } as Task;

        let action;
        if (this.task && this.task.id) {
            action = this.taskService.updateTask;
            task.id = this.task.id;
        } else {
            action = this.taskService.createTask;
        }

        action
            .bind(this.taskService)(task)
            .subscribe((newTask: Task) => {
                this.taskAction.emit(newTask);
                this.ngbModal.dismissAll();
            });
    }

    onDelete() {
        if (!this.task || !this.task.id) return;
        this.taskService.deleteTask(this.task.id).subscribe(() => {
            this.taskAction.emit();
            this.ngbModal.dismissAll();
        });
    }
}
