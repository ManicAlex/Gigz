import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  users;
  
  constructor(
    private storage: Storage, 
    private details: UserDetailsUtilityService, 
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.details.getAllBands()
    .subscribe(data => {
      this.users = data['data'];
      console.log(this.users);
    });
  }

  goToProfile(id) {
    this.router.navigate(['/user-profile'], { queryParams: { id: id } });
  }

  countBands() {
    if (this.users == []) {
      console.log('no results');
    }
  }
}
