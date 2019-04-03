import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { Storage } from '@ionic/storage';
import { UserServiceService } from './../../services/user-service.service';


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
      icon: 'person',
      role: '3'
    },
    {
      title: 'Notifications',
      url: '/menu/notifications',
      icon: 'notifications',
      count: 'totalCount()',
      role: '3'
    },
    {
      title: 'Favourites',
      url: '/menu/favourite',
      icon: 'star',
      role: '3'
    },
    {
      title: 'Venue List',
      url: '/menu/list-venues',
      icon: 'business',
      role: '1'
    },
    {
      title: 'Entertainer List',
      url: '/menu/list-bands',
      icon: 'microphone',
      role: '0'
    },
    {
      title: 'Edit Profile',
      url: '/menu/edit-details',
      icon: 'create',
      role: '3'
    }
  ];

  selectedPath = '';
  pendingCount: number;
  acceptedCount: number;
  totalCount: number;
  userInfo: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private details: UserDetailsUtilityService,
    private storage: Storage,
    private user: UserServiceService ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
    this.storage.get('access_token').then(token => {
      this.user.getUserDetails(token).subscribe(val => {
        this.userInfo = val['data'][0];
      }
      );
    });
   }

  ngOnInit() {
    this.getNotifications();
    window.setInterval(
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

  getRole(page) {
    if (page['role'] !== this.userInfo.role){
      return true;
    } else {
      return false;
    }
  }
}


