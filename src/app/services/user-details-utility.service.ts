import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsUtilityService {

  constructor(private http: HttpClient, private storage: Storage) { }

  url = environment.url;
  id = '';
  authenticationState = new BehaviorSubject(false);

  getUserDetails(token) {
    return this.http.get(`${this.url}/api/user?token=${token}`);
  }
  addDetails(credentials) {
    return this.http.post(`${this.url}/api/storeUserDetails`, credentials);
  }
}
