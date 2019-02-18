import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowRequestsReceivedPage } from './show-requests-received.page';

const routes: Routes = [
  {
    path: '',
    component: ShowRequestsReceivedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowRequestsReceivedPage]
})
export class ShowRequestsReceivedPageModule {}
