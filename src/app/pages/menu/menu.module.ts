import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
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
},
{ path: 'menu',
loadChildren: '../menu/menu.module#MenuPageModule',
canActivate: [AuthGuardService]
},
{ path: 'favourite',
loadChildren: '../favourite/favourite.module#FavouritePageModule',
canActivate: [AuthGuardService]
},
{ path: 'notifications',
loadChildren: '../notifications/notifications.module#NotificationsPageModule',
canActivate: [AuthGuardService]
},
{
  path: 'send-request',
  loadChildren: '../send-request/send-request.module#SendRequestPageModule',
  canActivate: [AuthGuardService]
},
{
  path: 'show-my-requests',
  loadChildren: '../show-my-requests/show-my-requests.module#ShowMyRequestsPageModule',
  canActivate: [AuthGuardService]
},
{
  path: 'show-requests-received',
  loadChildren: '../show-requests-received/show-requests-received.module#ShowRequestsReceivedPageModule',
  canActivate: [AuthGuardService]
},
{ path: 'request',
 loadChildren: '../request/request.module#RequestPageModule',
 canActivate: [AuthGuardService]
 },
 {
   path: 'upload-image',
   loadChildren: '../upload-image/upload-image.module#UploadImagePageModule',
   canActivate: [AuthGuardService]
  }

    ]
  },
  {
    path: '',
    redirectTo: '/menu/profile'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
