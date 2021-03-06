import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-venues',
  templateUrl: './list-venues.page.html',
  styleUrls: ['./list-venues.page.scss'],
})
export class ListVenuesPage implements OnInit {

  users;
  user: any;

  constructor(
    private storage: Storage, 
    private details: UserDetailsUtilityService, 
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit() {
    this.details.getAllVenues()
    .subscribe(data => {
      this.users = data['data'];
      console.log(this.users);
    });
  }

  goToProfile(id) {
    this.router.navigate(['/menu/user-profile'], { queryParams: { id: id } });
  }
  
  countVenues() {
    if (this.users == []) {
      console.log('no results');
    }
  }
  findIfEmpty() {
    if (this.users['length'] === 0) {
      return true;
    } else {
      return false;
    }
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.user = {

      };
    }, 2000);
  }

  doRefresh(event) {
    this.details.getAllVenues()
    .subscribe(data => {
      this.users = data['data'];
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}