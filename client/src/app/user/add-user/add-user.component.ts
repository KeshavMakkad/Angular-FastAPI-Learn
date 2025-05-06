import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  addUserForm: FormGroup;
  message: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.addUserForm = this.fb.group(
      {
        name: ['', Validators.required],
        username: ['', [Validators.required, this.noSpacesValidator]]
      },
    );
  }

  noSpacesValidator(control: AbstractControl): ValidationErrors | null {
    const hasSpace = (control.value || '').includes(' ');
    return hasSpace ? { noSpaces: true } : null;
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const formData = this.addUserForm.value;
      this.http.post(`${environment.backendApiUrl}/users`, formData).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
          this.message = 'User added successfully.';
          this.addUserForm.reset();
        },
        error: (error) => {
          console.error('Error adding user', error);
          this.message = `Failed to add user. Server message: ${error.error?.detail || 'Unknown error'}`;
        }
      });
    }
  }
}
