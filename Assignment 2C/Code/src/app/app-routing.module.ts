import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'loginuser',component:LoginComponent},
  {path:'registeruser',component:RegisterComponent},
  {path:'profileuser',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginComponent,RegisterComponent,ProfileComponent]
