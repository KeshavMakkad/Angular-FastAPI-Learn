import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-get-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent {
  getUserForm: FormGroup;
  user: { name: string; username: string } | null = null;
  message: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.getUserForm = this.fb.group(
      {
        id: ['', Validators.required]
      },
    );
  }

  onSubmit() {
    if (this.getUserForm.valid) {
      const userId = this.getUserForm.value.id;
      this.http.get<{ name: string; username: string }>(`${environment.backendApiUrl}/users/${userId}`).subscribe({
        next: (response) => {
          this.user = response;
          this.message = 'User fetched successfully.';
        },
        error: (error) => {
          console.error('Error fetching user', error);
          this.user = null;
          this.message = `Failed to get user. Server message: ${error.error?.detail || 'Unknown error'}`;
        }
      });
    }
  }
}
