import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      { path: 'register', 
    loadChildren: '../register/register.module#RegisterPageModule' 
  },
  { 
    path: 'add-details', 
    loadChildren: '../add-details/add-details.module#AddDetailsPageModule',
    canActivate: [AuthGuardService]  
},
  { 
    path: 'edit-details', 
    loadChildren: '../edit-details/edit-details.module#EditDetailsPageModule',
    canActivate: [AuthGuardService] 
},
{ 
  path: 'profile', 
  loadChildren: '../profile/profile.module#ProfilePageModule', 
  canActivate: [AuthGuardService] 
},
{ 
  path: 'list-venues', 
  loadChildren: '../list-venues/list-venues.module#ListVenuesPageModule', 
  canActivate: [AuthGuardService] 
},
{ 
  path: 'list-bands', 
  loadChildren: '../list-bands/list-bands.module#ListBandsPageModule',
  canActivate: [AuthGuardService] 
},
{
  path: 'user-profile',
  loadChildren: '../user-profile/user-profile.module#UserProfilePageModule',
  canActivate: [AuthGuardService]
}
    ]
  },
  {
    path:'',
    redirectTo: 'menu/profile'
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
