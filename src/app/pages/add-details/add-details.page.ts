import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.page.html',
  styleUrls: ['./add-details.page.scss'],
})
export class AddDetailsPage implements OnInit {
  credentialsForm: FormGroup;
  userId: number;
  url = environment.url;
  token;
  authenticationState = new BehaviorSubject(false);

  constructor(private formBuilder: FormBuilder, private authService: AuthService
    , private storage: Storage, private details: UserDetailsUtilityService, private router: Router) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      genre: ['', Validators.required],
      bios: ['', Validators.required],
      //avatarURL: [],
      contactNumber: ['', [Validators.minLength(10),Validators.pattern(/^[0-9]{10}$/)]],
      //locationId: [],
    });
    this.storage.get('access_token').then((token) => {
      this.details.getUser(token)
      .subscribe(data => {
        this.userId = data['user']['id'];
      }) 
    });
    this.storage.get('access_token').then((token) => {
      this.token = token;
    }
    );
  }

  onSubmit() {
    this.details.addDetails(this.credentialsForm.value,this.token).subscribe();

  }

}
