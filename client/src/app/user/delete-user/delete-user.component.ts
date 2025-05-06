import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  deleteUserForm: FormGroup;
  message: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.deleteUserForm = this.fb.group(
      {
        id: ['', Validators.required]
      },
    );
  }

  onSubmit() {
    if (this.deleteUserForm.valid) {
      const userId = this.deleteUserForm.value.id;
      this.http.delete(`${environment.backendApiUrl}/users/${userId}`).subscribe({
        next: () => {
          this.message = 'User deleted successfully.';
          this.deleteUserForm.reset();
        },
        error: (error) => {
          console.error('Error deleting user', error);
          this.message = `Failed to delete user. Server message: ${error.error?.detail || 'Unknown error'}`;
        }
      });
    }
  }
}
