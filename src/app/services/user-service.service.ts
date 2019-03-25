import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient,private storage:Storage) { }

  url = 'https://www.stefandesigns.org/index.php';
  user:object;


  getUserDetails(token) {
    return this.http.get(`${this.url}/api/showAuthUserAndDetails`,{
      headers: {'Authorization':`Bearer ${token}`,'Content-Type':'application/x-www-form-urlencoded'}
   });
  }

  getUser() {
    this.storage.get('access_token').then((token) => {
      this.getUserDetails(token)
      .subscribe(data => {
        this.user = data['data'][0];
      }) 
    });
    return this.user;
  }
}
