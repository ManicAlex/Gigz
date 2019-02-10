import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService
    , private storage: Storage, private details: UserDetailsUtilityService) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      genre: ['', Validators.required],
      bios: ['', Validators.required],
      contactNumber: ['', [Validators.minLength(10),Validators.pattern(/^[0-9]{10}$/)]],
    });
    this.storage.get('access_token').then((token) => {
      this.details.getUserDetails(token)
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
    this.details.addDetails(this.credentialsForm.value).subscribe();
  }

}
