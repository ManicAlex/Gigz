import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListBandsPage } from './list-bands.page';
import { Userprofile2Component } from './userprofile2/userprofile2.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';


const routes: Routes = [
  {
    path: '',
    component: ListBandsPage
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
  declarations: [ListBandsPage, Userprofile2Component]
})
export class ListBandsPageModule {}
