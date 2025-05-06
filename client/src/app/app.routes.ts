import { Routes } from '@angular/router';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { GetUserComponent } from './user/get-user/get-user.component';

export const routes: Routes = [
  { path: 'user/add', component: AddUserComponent },
  { path: 'user/update', component: UpdateUserComponent },
  { path: 'user/delete', component: DeleteUserComponent },
  { path: 'user/get', component: GetUserComponent },
  { path: '', redirectTo: 'user/add', pathMatch: 'full' }
];
  