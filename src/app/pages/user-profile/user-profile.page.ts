import { Component, OnInit } from '@angular/core';
import { UserDetailsUtilityService } from 'src/app/services/user-details-utility.service';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  constructor(
    private service:UserDetailsUtilityService,
    private storage: Storage,
    private router: Router,
    private actRoute: ActivatedRoute
    ) { }

    id:number;
    user;

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
    this.actRoute.queryParams.subscribe(params => {
       this.id = params['id'];
    });
    this.storage.get('access_token').then((token) => {
      this.service.getUserById(token,this.id).subscribe(val => {
        this.user = val['data'][0];
        console.log(this.user);
      });
    });
  }

}
