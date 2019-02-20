import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  goToProfile(id) {
    this.router.navigate(['/menu/user-profile'], { queryParams: { id: id } });
  }
}
