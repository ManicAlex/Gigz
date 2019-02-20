import { Component, OnInit } from '@angular/core';
import { UserDetailsUtilityService } from 'src/app/services/user-details-utility.service';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(
    private details: UserDetailsUtilityService,
    private storage:Storage,
    private router: Router
    ) { }

    values:object;

  ngOnInit() {
    this.storage.get('access_token').then((token) => {
      this.details.displayRequestsRecievedDetails(token).subscribe(
        data => {
          this.values = data['data'];
          console.log(this.values);
        }
      );
      console.log(this.values);
    }
    );
  }

  goToRequest(id) {
    this.router.navigate(['/request'], { queryParams: { id: id } });
  }

}
