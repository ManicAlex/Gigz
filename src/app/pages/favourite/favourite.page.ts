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

  token;

  ngOnInit() {
<<<<<<< HEAD
    this.details.getAllVenues()
    .subscribe(data => {
      this.users = data['data'];
      console.log(this.users);
    });
=======
    this.storage.get('access_token').then(token => {
      this.token = token;
      this.details.getAllFavourites(token)
      .subscribe(data => {
        this.users = data['data'];
        console.log(this.users);
      });
   });
>>>>>>> b00e4ca68333c4ef4908cbcd388d421a3e9130dc
  }

  goToProfile(id) {
    this.router.navigate(['/user-profile'], { queryParams: { id: id } });
  }

<<<<<<< HEAD
  countVenues() {
    if (this.users == []) {
      console.log('no results');
=======
  unfavourite(id) {
    this.details.unfavourite(id,this.token).subscribe(
      res => {
        if (res['success']) {
          this.details.presentPositiveToast('User has been unfavourited');
          this.details.getAllFavourites(this.token)
          .subscribe(data => {
            this.users = data['data'];
            console.log(this.users);
          });
        } else {
          this.details.presentToast('Sorry, failed to unfavourite');
        }
      }
    )
  }


  findIfEmpty() {
    if (this.users['length'] === 0) {
      return true;
    } else {
      return false;
>>>>>>> b00e4ca68333c4ef4908cbcd388d421a3e9130dc
    }
  }
}
