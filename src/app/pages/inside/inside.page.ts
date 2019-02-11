import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {
 
  data = '';
  loggedIn = new BehaviorSubject(false);

  constructor(
    private authService: AuthService, 
    private storage: Storage, 
    private toastController: ToastController,
    private router: Router
    ) { }
 
  ngOnInit() {
    this.loggedIn.next(true);
  }
 
  loadSpecialInfo() {
    this.authService.getSpecialData();
  }
 
  logout() {
    this.authService.logout();
  }
 
  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove('access_token');
 
    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }
 
}