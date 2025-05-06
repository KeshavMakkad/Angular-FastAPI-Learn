import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass
  ],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent {
  fetchUserForm: FormGroup;
  updateUserForm: FormGroup;
  user: { id: string; name: string; username: string } | null = null;
  message: string | null = null;

  updateFormSubmitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.fetchUserForm = this.fb.group({
      username: ['', [Validators.required, this.noSpaceValidator]]
    });

    this.updateUserForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, this.noSpaceValidator]]
    });
  }

  noSpaceValidator(control: { value: string }) {
    return control.value && control.value.includes(' ') ? { noSpace: true } : null;
  }

  fetchUser() {
    if (this.fetchUserForm.valid) {
      const userId = this.fetchUserForm.value.username;
      this.http.get<{ id: string; name: string; username: string }>(`${environment.backendApiUrl}/users/${userId}`).subscribe({
        next: (response) => {
          this.user = response;
          this.updateUserForm.setValue({
            name: this.user.name,
            username: this.user.username
          });
          this.message = 'User fetched successfully.';
        },
        error: (error) => {
          this.user = null;
          this.updateUserForm.reset();
          this.message = `Failed to fetch user. Server message: ${error.error?.detail || 'Unknown error'}`;
        }
      });
    }
  }

  updateUser() {
    this.updateFormSubmitted = true;

    if (this.updateUserForm.valid) {
      const updatedData = this.updateUserForm.value;
      const userId = this.user?.id;

      this.http.put(`${environment.backendApiUrl}/users/${userId}`, updatedData).subscribe({
        next: () => {
          this.user = null;
          this.updateUserForm.reset();
          this.updateFormSubmitted = false;
          this.message = 'User updated successfully.';
        },
        error: (error) => {
          this.message = `Failed to update user. Server message: ${error.error?.detail || 'Unknown error'}`;
        }
      });
    }
  }
}
