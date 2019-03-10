import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsUtilityService {

  constructor(
    private http: HttpClient, 
    private storage: Storage,
    private router: Router,
    private authservice:AuthService,
    private toastController: ToastController
    ) { }

  url = environment.url;
  id = '';

  getUser(token) {
    return this.http.get(`${this.url}/api/user?token=${token}`);
  }

  getUserDetails(token) {
    return this.http.get(`${this.url}/api/editAuthUserDetails`,{
      headers: {'Authorization':`Bearer ${token}`,'Content-Type':'application/x-www-form-urlencoded'}
   });
  }

  getAllUserDetails(token) {
    return this.http.get(`${this.url}/api/showUserAndDetails`,{
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  getAllBands() {
    return this.http.get(`${this.url}/api/showRole0`)
  }

  getAllVenues() {
    return this.http.get(`${this.url}/api/showRole1`)
  }

  getUserById(token,id) {
    return this.http.get(`${this.url}/api/showUserAndDetails/${id}`,{
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  addDetails(credentials, token) {
    return this.http.post(`${this.url}/api/storeUserDetails`, this.getFormUrlEncoded(credentials),{
      headers: {'Authorization':`Bearer ${token}`,'Content-Type':'application/x-www-form-urlencoded'}
   }).pipe(
    tap(() => {
      this.authservice.authenticationState.next(true);
      this.router.navigate(['menu/profile']);
    }),
    catchError(e => {
      throw new Error(e);
    })
  );
  }

   editDetails(credentials, token) {
    console.log(credentials);
    return this.http.patch(`${this.url}/api/updateAuthUserDetails`, this.getFormUrlEncoded(credentials),{
      headers: {'Authorization':`Bearer ${token}`,'Content-Type':'application/x-www-form-urlencoded'}
   }).pipe(
    tap(() => {
      this.router.navigate(['menu/profile']);
    }),
    catchError(e => {
      throw new Error(e);
    })
  );
  }

  sendRequest(credentials,token,id) {
    return this.http.post(
      `${this.url}/api/storeRequest/${id}`, 
      credentials,
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  showRequestsByUser(token) {
    return this.http.get(
      `${this.url}/api/showRequestsByUser`, 
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  acceptRequest(id,token) {
    return this.http.patch(
      `${this.url}/api/acceptRequest/${id}`,'', 
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  declineRequest(id,token) {
    return this.http.patch(
      `${this.url}/api/declineRequest/${id}`, '',
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  displayRequestsRecievedDetails(token) {
    return this.http.get(
      `${this.url}/api/requestingUsersToAuth`, 
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  displayAcceptedRequests(token) {
    return this.http.get(
      `${this.url}/api/requestingUsersToAuthAccept`, 
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  displayRejectedRequests(token) {
    return this.http.get(
      `${this.url}/api/requestingUsersToAuthDecline`, 
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }
  displayAcceptedRequestsFromSelf(token) {
    return this.http.get(
      `${this.url}/api/showRequestedFromUserAccepted`, 
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  getRequest(id, token) {
    return this.http.get(
      `${this.url}/api/showRequestsToAuth/${id}`, 
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
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

  getFormUrlEncoded(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		return formBody.join('&');
  }

  storeFav(id, token) {
    return this.http.post(
      `${this.url}/api/storeFav/${id}`,'',
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  getAllFavourites(token){
    return this.http.get(
      `${this.url}/api/favoritedUsersTrue`,
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }

  unfavourite(id, token) {
    return this.http.patch(
      `${this.url}/api/unFavorite/${id}`,'',
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }
  storeReview(credentials,token,id) {
    return this.http.post(
      `${this.url}/api/storeReview/${id}`, 
      credentials,
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }
  showReviewsById(token,id) {
    return this.http.get(
      `${this.url}/api/showReviews/${id}`,
      {
      headers: {'Authorization':`Bearer ${token}`}
   });
  }
}
