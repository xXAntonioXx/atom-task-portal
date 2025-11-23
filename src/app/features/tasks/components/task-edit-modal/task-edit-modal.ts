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
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

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
    private data = inject(DIALOG_DATA);
    private dialogRef = inject(MatDialogRef<TaskEditModal>);

    taskId: string | undefined = this.data.id;
    form: FormGroup = this.fb.group({
        title: [this.data.title || '', Validators.required],
        description: [this.data.description || '', Validators.required],
    });

    onSubmit() {
        const task = {
            ...this.form.value,
        } as Task;
        let action;
        if (this.taskId) {
            action = this.taskService.updateTask;
            task.id = this.taskId;
        } else {
            action = this.taskService.createTask;
        }
        action
            .bind(this.taskService)(task)
            .subscribe((newTask: Task) => {
                this.dialogRef.close(newTask);
            });
    }

    onDelete() {
        if (!this.taskId) return;
        this.taskService.deleteTask(this.taskId).subscribe(() => {
            this.dialogRef.close();
        });
    }
}
