import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {ToastController} from '@ionic/angular';
 
const TOKEN_KEY = 'access_token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  url = 'http://www.stefandesigns.org/index.php/';
  user = null;
  authenticationState = new BehaviorSubject(false);
  halfRegisteredState = new BehaviorSubject(false);
 
  constructor(private http: HttpClient, 
    private helper: JwtHelperService, 
    private storage: Storage,
    private plt: Platform, 
    private alertController: AlertController, 
    private route: Router,
    private toastController: ToastController
    ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
 
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }
 
  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      tap(res => {
        this.storage.set(TOKEN_KEY, res['token'])
        .then(() => {
        this.user = this.helper.decodeToken(res['token']);
        }).then(() => {
          this.authenticationState.next(true);
          this.route.navigate(['add-details']);
        });
      }),
      catchError(e => {
        this.presentToast(e.error.msg);
      throw new Error(e);
      })
    );
  }
 
  login(credentials) {
    return this.http.post(`${this.url}/api/login`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.presentToast(e.error.message);
          throw new Error(e);
        })
      );
  }
 
  logout() {
      this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      location.reload();
      this.route.navigate(['login']);
    });
  }
 
  getSpecialData() {
    this.storage.get('access_token').then((val) => {
      console.log('Your token is', val);
    });
    
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: 'danger'
    });
    toast.present();
  }
  async presentPositiveToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: 'success'
    });
    toast.present();
  }
}

export interface Config {
  heroesUrl: string;
  textfile: string;
}