import { Component, OnInit } from '@angular/core';
import { UserDetailsUtilityService } from 'src/app/services/user-details-utility.service';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {SharedDetailsService} from 'src/app/services/shared-details.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

 skel: any;

  constructor(
    private details: UserDetailsUtilityService,
    private sharedDetails: SharedDetailsService,
    private storage: Storage,
    private router: Router
    ) { }

    values: object;
    currentValue: object;
    acceptedValues: object;
    acceptedValuesOther: object;
    declinedValues: object;
    token;

  ngOnInit() {
    this.values, this.acceptedValues, this.declinedValues = null;
    this.storage.get('access_token').then((token) => {
      this.token = token;
      this.details.displayAcceptedRequestsFromSelf(token).subscribe(
        data => {
          this.acceptedValuesOther = data['data'];
        }
      );
      this.details.displayAcceptedRequests(token).subscribe(
        data => {
          this.acceptedValues = data['data'];
        }
      );
      this.details.displayRejectedRequests(token).subscribe(
        data => {
          this.declinedValues = data['data'];
        }
      );
      this.details.displayRequestsRecievedDetails(token).subscribe(
        data => {
          this.values = data['data'];
        }
      );
    }
    );
  }

  goToRequest(id) {
    this.currentValue = this.values[id];
    console.log(this.values);
    this.sharedDetails.setData(this.currentValue);
    this.router.navigate(['/menu/request']);
  }

  goToAcceptedRequest(id) {
    this.currentValue = this.acceptedValues[id];
    console.log(this.acceptedValues);
    this.sharedDetails.setData(this.currentValue);
    this.router.navigate(['/menu/request']);
  }

  goToAcceptedRequestOther(id) {
    this.currentValue = this.acceptedValuesOther[id];
    console.log(this.currentValue);
    this.sharedDetails.setData(this.currentValue);
    this.router.navigate(['/menu/request']);
  }

  goToRejectedRequest(id) {
    this.currentValue = this.declinedValues[id];
    console.log(this.declinedValues);
    this.sharedDetails.setData(this.currentValue);
    this.router.navigate(['/menu/request']);
  }

  findIfEmpty() {
    if (this.values['length'] === 0 && this.acceptedValues['length'] === 0 && this.declinedValues['length'] === 0) {
      return true;
    } else {
      return false;
    }
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.skel = {

      };
    }, 2000);
  }

  doRefresh(event) {
    this.details.displayAcceptedRequestsFromSelf(this.token).subscribe(
      data => {
        this.acceptedValuesOther = data['data'];
      }
    );
    this.details.displayAcceptedRequests(this.token).subscribe(
      data => {
        this.acceptedValues = data['data'];
      }
    );
    this.details.displayRejectedRequests(this.token).subscribe(
      data => {
        this.declinedValues = data['data'];
      }
    );
    this.details.displayRequestsRecievedDetails(this.token).subscribe(
      data => {
        this.values = data['data'];
      }
    );

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
