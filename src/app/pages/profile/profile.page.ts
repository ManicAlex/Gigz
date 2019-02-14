import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import {UserServiceService} from './../../services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  token;
  user:object;
  constructor(
    private router: Router, 
    private authService: AuthService, 
    private storage: Storage, 
    private details: UserDetailsUtilityService, 
    private http: HttpClient,
    private getUser: UserServiceService
    ) { }

  ngOnInit() {
    this.user = {
      created_at: null,
      email: null,
      email_verified_at: null,
      id: null,
      name: null,
      role: null,
      updated_at: null,
      user_details: {
        avatarURL: null,
        bios: null,
        contactNumber: null,
        created_at: null,
        genre: null,
        id: null,
        locationId: null,
        updated_at: null,
        user_id: null,
      }
    };
    this.storage.get('access_token').then((token) => {
      this.token = token;

       this.getUser.getUserDetails(token)
       .subscribe(data2 => {
         this.user = data2['data']['0'];
       })
    });

  }

  

  listBands(){
    this.router.navigate(['list-bands']);
  }

  listVenues(){
    this.router.navigate(['list-venues']);
  }

  logout() {
    this.authService.logout();
  }

  Navbar(){
    this.router.navigate(['navbar']);
  }
  
}
