import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth/auth.guard';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'auth', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
