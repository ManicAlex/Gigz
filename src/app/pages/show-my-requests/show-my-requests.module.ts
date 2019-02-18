import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowMyRequestsPage } from './show-my-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ShowMyRequestsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowMyRequestsPage]
})
export class ShowMyRequestsPageModule {}
