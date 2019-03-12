import { Component, OnInit } from '@angular/core';
import { UserDetailsUtilityService } from 'src/app/services/user-details-utility.service';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {SharedDetailsService} from 'src/app/services/shared-details.service'
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(
    private details: UserDetailsUtilityService,
    private sharedDetails: SharedDetailsService,
    private storage:Storage,
    private router: Router
    ) { }

    values:object;
    currentValue:object;
    acceptedValues:object;
    acceptedValuesOther:object;
    declinedValues:object;

  ngOnInit() {
    this.values,this.acceptedValues,this.declinedValues = null;
    this.storage.get('access_token').then((token) => {
      this.details.displayAcceptedRequestsFromSelf(token).subscribe(
        data => {
          this.acceptedValuesOther = data['data'];
          console.log(this.acceptedValuesOther);
        }
      );
      this.details.displayAcceptedRequests(token).subscribe(
        data => {
          this.acceptedValues = data['data'];
          console.log(this.acceptedValues);
        }
      );
      this.details.displayRejectedRequests(token).subscribe(
        data => {
          this.declinedValues = data['data'];
          console.log(this.declinedValues);
        }
      );
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
    this.currentValue = this.values[id];
    this.sharedDetails.setData(this.currentValue);
    this.router.navigate(['menu/request']);
  }

  findIfEmpty() {
    if (this.values['length'] === 0 && this.acceptedValues['length'] === 0 && this.declinedValues['length'] === 0) {
      return true;
    } else {
      return false;
    }
  }

}
