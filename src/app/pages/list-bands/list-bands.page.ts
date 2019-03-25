import { Component, OnInit } from '@angular/core';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-list-bands',
  templateUrl: './list-bands.page.html',
  styleUrls: ['./list-bands.page.scss'],
})
export class ListBandsPage implements OnInit {

  users;
  user: any;

  constructor( 
    private details: UserDetailsUtilityService, 
    private router: Router,
    private storage: Storage
    ) { }

  ngOnInit() {
    this.details.getAllBands()
    .subscribe(data => {
      this.users = data['data'];
    });
  }

  goToProfile(id) {
    this.router.navigate(['/menu/user-profile'], { queryParams: { id: id } });
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
    this.details.getAllBands()
    .subscribe(data => {
      this.users = data['data'];
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
