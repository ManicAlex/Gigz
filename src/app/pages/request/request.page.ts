import { Component, OnInit } from '@angular/core';
import {SharedDetailsService} from 'src/app/services/shared-details.service';
import {UserDetailsUtilityService} from 'src/app/services/user-details-utility.service';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  constructor(
    private sharedDetails: SharedDetailsService,
    private details: UserDetailsUtilityService,
    private storage: Storage,
    private router: Router
  ) { }

  user: object = {
    created_at: null,
      email: null,
      email_verified_at: null,
      id: null,
      name: null,
      role: null,
      updated_at: null,
      user_details: {
        avatarURL: null,
        bios: null,
        contactNumber: null,
        created_at: null,
        genre: null,
        id: null,
        locationId: null,
        updated_at: null,
        user_id: null,
      }
    };
    requests;
    token: string;
    id;

  ngOnInit() {
    this.user = this.sharedDetails.getData();
    console.log(this.user);
    this.id = this.user['id'];
    this.storage.get('access_token').then(
      (token) => {
        this.token = token;
        this.details.getRequest(this.id, token).subscribe(
          data => {
            this.requests = data['data'];
            console.log(data);
          }
        );
      })
      ;
    }
    acceptRequest(id) {
        this.details.acceptRequest(id, this.token).subscribe(
          (res) => {
            console.log(res);
            if (res['success'] === true) {
              this.details.getRequest(this.id, this.token).subscribe(
                data => {
                  this.requests = data['data'];
                  console.log(this.requests);
                  this.details.presentPositiveToast(res['message']);
                }
              );
            } else {
              this.details.presentToast(res['message']);
            }
          }
        );
    }
    decline(id) {
        this.details.declineRequest(id, this.token).subscribe(
          (res) => {
            console.log(res);
            if (res['success'] === true) {
              this.details.getRequest(this.id, this.token).subscribe(
                data => {
                  this.requests = data['data'];
                  console.log(this.requests);
                  this.details.presentPositiveToast(res['message']);
                }
              );
            } else {
              this.details.presentToast(res['message']);
            }
          }
        );
    }
    getStatus(status) {
      if (status === 1) {
        return 'Accepted';
      } else if (status === 2) {
        return 'Rejected';
      } else {
        return 'Pending';
      }
    }

    getFormattedDate(date) {
      const date2 = new Date(date);
      const day = date2.getDate();
      const month = date2.getMonth() + 1;
      const year = date2.getFullYear();
      return `${day}/${month}/${year}`;
    }
    getFormattedTime(date) {
      const date2 = new Date(date);
      let hours = date2.getHours();
      const mins = date2.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${mins} ${ampm}`;
    }
}





