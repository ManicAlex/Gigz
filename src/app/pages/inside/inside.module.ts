import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InsidePage } from './inside.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: InsidePage
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
  declarations: [InsidePage]
})
export class InsidePageModule {}
