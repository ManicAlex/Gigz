import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListVenuesPage } from './list-venues.page';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {
    path: '',
    component: ListVenuesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListVenuesPage, UserprofileComponent]
})
export class ListVenuesPageModule {}
