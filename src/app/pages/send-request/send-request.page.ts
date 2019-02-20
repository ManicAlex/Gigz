import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.page.html',
  styleUrls: ['./send-request.page.scss'],
})
export class SendRequestPage implements OnInit {

  credentialsForm: FormGroup;
  id: number;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
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
      price:['',Validators.required],
      requestDate:['',Validators.required],
      status:[0]
    });
  }

  onSubmit() {
    this.credentialsForm.value['requestDate'] = this.credentialsForm.value['requestDate'].split('T').join(' ').split('Z').join('');
    this.storage.get('access_token').then((token) => {
      this.details.sendRequest(this.credentialsForm.value,token,this.id)
      .subscribe(res => {
        this.presentToast();
        this.router.navigate([`menu/profile`])
      })
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
