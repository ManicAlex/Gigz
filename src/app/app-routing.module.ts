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
  { path: 'register', 
    loadChildren: './pages/register/register.module#RegisterPageModule' 
  },
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
{ 
  path: 'profile', 
  loadChildren: './pages/profile/profile.module#ProfilePageModule', 
  canActivate: [AuthGuardService] 
},
{ 
  path: 'list-venues', 
  loadChildren: './pages/list-venues/list-venues.module#ListVenuesPageModule', 
  canActivate: [AuthGuardService] 
},
{ 
  path: 'list-bands', 
  loadChildren: './pages/list-bands/list-bands.module#ListBandsPageModule',
  canActivate: [AuthGuardService] 
},
{
  path: 'user-profile',
  loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule',
  canActivate: [AuthGuardService]
},
  { path: 'menu',
   loadChildren: './pages/menu/menu.module#MenuPageModule',
   canActivate: [AuthGuardService]
   },
  { path: 'favourite',
   loadChildren: './pages/favourite/favourite.module#FavouritePageModule',
   canActivate: [AuthGuardService]
   },
  { path: 'notifications',
   loadChildren: './pages/notifications/notifications.module#NotificationsPageModule',
   canActivate: [AuthGuardService]
   },


];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }