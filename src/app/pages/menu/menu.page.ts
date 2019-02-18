import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Profile',
      url: '/menu/profile',
      icon: 'person'
    },
    {
      title: 'Edit Profile',
      url: '/menu/edit-details',
      icon: 'create'
    },
    {
      title: 'Venue Feed',
      url: '/menu/list-venues',
      icon: 'business'
    },
    {
      title: 'Band Feed',
      url: '/menu/list-bands',
      icon: 'microphone'
    },
    {
      title: 'Favorites',
      url: '/menu/favourite',
      icon: 'star'
    },
    {
      title: 'Notifications',
      url: '/menu/notifications',
      icon: 'notifications'
    }
  ];

  selectedPath = '';

  constructor(private router: Router, private authService: AuthService ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  ngOnInit() {

 
  }

  logout() {
    this.authService.logout();
  }

}


