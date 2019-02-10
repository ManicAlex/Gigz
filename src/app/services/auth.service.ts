import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
 
const TOKEN_KEY = 'access_token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);
  halfRegisteredState = new BehaviorSubject(false);
 
  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController) {
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
          this.halfRegisteredState.next(true);
        });
      }),
      catchError(e => {
      //   let value = false;
      //   const obj = credentials;
      //   if (credentials.email) {

      //   }
      //   for (var key in obj) {
      //     if (Object.prototype.hasOwnProperty.call(obj, key)) {
      //         var val = obj[key];
      //         // use val
      //         console.log(val);
      //         if (val === '') {
      //           value = true;
      //           this.showAlert("Please enter all details");
      //         }
      //         if (value = true) {
      //           break; 
      //         }
      //     }
          
      // }
      this.showAlert("Failed registration");
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
          this.showAlert(e.error.message);
          throw new Error(e);
        })
      );
  }
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
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
}

export interface Config {
  heroesUrl: string;
  textfile: string;
}