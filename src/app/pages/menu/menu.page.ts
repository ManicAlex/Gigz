import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { Storage } from '@ionic/storage';

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
      title: 'Notifications',
      url: '/menu/notifications',
      icon: 'notifications'
    },
    {
      title: 'Favorites',
      url: '/menu/favourite',
      icon: 'star'
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
      title: 'Edit Profile',
      url: '/menu/edit-details',
      icon: 'create'
    }
  ];

  selectedPath = '';
  pendingCount: number;
  acceptedCount: number;
  totalCount: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private details: UserDetailsUtilityService,
    private storage: Storage ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  ngOnInit() {
    this.getNotifications();
    setTimeout(
      () => {
        this.totalCount = this.pendingCount + this.acceptedCount;
        console.log(this.totalCount);
      }, 6000
    );
  }

  logout() {
    this.authService.logout();
  }

  getNotifications() {
    this.storage.get('access_token').then(
      token => {
      this.details.showPendingCount(token).subscribe(
        data => {
          this.pendingCount = data['data'];
          console.log(this.pendingCount);
        }
      );
      this.details.showAcceptedCount(token).subscribe(
        data => {
          this.acceptedCount = data['data'];
          console.log(this.acceptedCount);
        }
      );
      }
    );
  }
}


