import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsUtilityService {

  constructor(private http: HttpClient, private storage: Storage, private router: Router,private authservice:AuthService) { }

  url = environment.url;
  id = '';

  getUserDetails(token) {
    return this.http.get(`${this.url}/api/user?token=${token}`);
  }
  addDetails(credentials, token) {
    return this.http.post(`${this.url}/api/storeUserDetails`, this.getFormUrlEncoded(credentials),{
      headers: {'Authorization':`Bearer ${token}`,'Content-Type':'application/x-www-form-urlencoded'}
   }).pipe(
    tap(() => {
      this.authservice.authenticationState.next(true);
    }),
    catchError(e => {
      throw new Error(e);
    })
  );
  }
  getFormUrlEncoded(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		return formBody.join('&');
	}
}
