import { Component, OnInit } from '@angular/core';
import { UserDetailsUtilityService } from 'src/app/services/user-details-utility.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-show-my-requests',
  templateUrl: './show-my-requests.page.html',
  styleUrls: ['./show-my-requests.page.scss'],
})
export class ShowMyRequestsPage implements OnInit {

  constructor(
    private storage: Storage,
    private service: UserDetailsUtilityService,
    ) { }

    requests:object;

  ngOnInit() {

    this.storage.get('access_token').then((token) => {
      this.service.showRequestsByUser(token).subscribe(val => {
        this.requests = val['data'];
        console.log(this.requests)
      });
    });
  }
  

  acceptRequest(id) {
    this.storage.get('access_token').then((token) => {
      this.service.acceptRequest(id,token).subscribe(val => {
        this.requests = val['data'];
        console.log(this.requests)
      });
    });
  }

  declineRequest(id) {

  }

}
