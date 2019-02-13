import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';

@Component({
  selector: 'app-list-bands',
  templateUrl: './list-bands.page.html',
  styleUrls: ['./list-bands.page.scss'],
})
export class ListBandsPage implements OnInit {

  users;

  constructor(private storage: Storage, private details: UserDetailsUtilityService, private http: HttpClient) { }

  ngOnInit() {

    this.storage.get('access_token').then((token) => {
      this.details.getAllUserDetails(token)
      .subscribe(data => {
        this.users = data['data'];
        console.log(this.users);
      }) 
    });
  }

}
