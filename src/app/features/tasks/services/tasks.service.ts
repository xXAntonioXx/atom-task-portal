import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/tasks.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    http = inject(HttpClient);
    private apiUrl = environment.apiUrl + '/tasks';

    getTasks() {
        return this.http.get<Task[]>(this.apiUrl);
    }

    getTaskById(id: number) {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }

    createTask(task: Task) {
        task.completed = false;
        task.createdAt = new Date();
        return this.http.post<Task>(this.apiUrl, task);
    }

    updateTask(task: Task) {
        return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
    }

    deleteTask(id: string) {
        return this.http.delete<Task>(`${this.apiUrl}/${id}`);
    }
}
