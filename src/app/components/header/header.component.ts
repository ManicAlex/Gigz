import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private storage: Storage) { }

  ngOnInit() {
  }

  listBands(){
    this.router.navigate(['list-bands']);
  }

  listVenues(){
    this.router.navigate(['menu']);
  }

  Profile(){
    this.router.navigate(['profile']);
  }

  logout() {
    this.authService.logout();
  }

}
