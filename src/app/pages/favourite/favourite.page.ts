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
    this.storage.get('access_token').then(token => {
      this.token = token;
      this.details.getAllFavourites(token)
      .subscribe(data => {
        this.users = data['data'];
        console.log(this.users);
      });
   });
  }

  goToProfile(id) {
    this.router.navigate(['/user-profile'], { queryParams: { id: id } });
  }

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
    }
  }
}
