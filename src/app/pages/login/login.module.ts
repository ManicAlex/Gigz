import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
 
import { IonicModule } from '@ionic/angular';
 
import { LoginPage } from './login.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
 
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}