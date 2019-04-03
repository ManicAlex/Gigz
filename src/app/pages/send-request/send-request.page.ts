import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.page.html',
  styleUrls: ['./send-request.page.scss'],
})
export class SendRequestPage implements OnInit {

  credentialsForm: FormGroup;
  credentialsFormUpdated: FormGroup;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private details: UserDetailsUtilityService,
    private router: Router,
    private actRoute: ActivatedRoute,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.id = params['id'];
   });
    this.credentialsForm = this.formBuilder.group({
      location: ['', Validators.required],
      details: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      status: [0]
    });
  }

  onSubmit() {
    this.credentialsFormUpdated = this.formBuilder.group({
      location: [this.credentialsForm.value['location'], Validators.required],
      details: [this.credentialsForm.value['details'], Validators.required],
      price: [this.credentialsForm.value['price'], Validators.required],
      requestDate: [this.credentialsForm.value['date'] + ' ' + this.credentialsForm.value['time'], Validators.required],
      status: [0]
    });
    this.credentialsFormUpdated.value['requestDate'] =
    this.credentialsFormUpdated.value['requestDate'].split('T').join(' ').split('Z').join('');
    console.log(this.credentialsFormUpdated.value);
    this.storage.get('access_token').then((token) => {
      this.details.sendRequest(this.credentialsFormUpdated.value, token, this.id)
      .subscribe(res => {
        this.presentToast();
        this.router.navigate([`menu/profile`]);
      });
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your request has been sent successfully.',
      duration: 4000,
      color: 'success'
    });
    toast.present();
  }
}
