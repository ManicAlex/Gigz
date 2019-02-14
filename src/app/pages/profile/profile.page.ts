import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  token;
  user = {
    "id": null,
    "user_id": null,
    "genre": null,
    "bios": null,
    "avaterURL": null,
    "contactNumber": null,
    "locationId": null,
    "updated_at": null

  };
  constructor(private router: Router, private authService: AuthService, private storage: Storage, private details: UserDetailsUtilityService, private http: HttpClient) { }

  ngOnInit() {
    this.storage.get('access_token').then((token) => {
      this.token = token;

       this.details.getUserDetails(token)
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

  Editdetails(){
    this.router.navigate(['edit-details']);
  }

  logout() {
    this.authService.logout();
  }
  
}
