import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'inside',
    loadChildren: './pages/inside/inside.module#InsidePageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { 
    path: 'add-details', 
    loadChildren: './pages/add-details/add-details.module#AddDetailsPageModule',
    canActivate: [AuthGuardService]  
},
  { 
    path: 'edit-details', 
    loadChildren: './pages/edit-details/edit-details.module#EditDetailsPageModule',
    canActivate: [AuthGuardService] 
},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }