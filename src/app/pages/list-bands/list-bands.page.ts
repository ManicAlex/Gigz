import { Component, OnInit } from '@angular/core';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-bands',
  templateUrl: './list-bands.page.html',
  styleUrls: ['./list-bands.page.scss'],
})
export class ListBandsPage implements OnInit {

  users;

  constructor( 
    private details: UserDetailsUtilityService, 
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
    this.router.navigate(['/menu/user-profile'], { queryParams: { id: id } });
  }

  countBands() {
    if (this.users == []) {
      console.log('no results');
    }
  }

}
