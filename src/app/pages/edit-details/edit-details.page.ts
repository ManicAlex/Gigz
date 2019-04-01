import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { pipe } from '@angular/core/src/render3';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.page.html',
  styleUrls: ['./edit-details.page.scss'],
})
export class EditDetailsPage implements OnInit {
  credentialsForm: FormGroup;
  userId: number;
  user = {
      "id": null,
      "user_id": null,
      "genre": null,
      "bios": null,
      "avatarURL": null,
      "contactNumber": null,
      "locationId": null,
      "updated_at": null
  };
  url = 'https://www.stefandesigns.org/index.php';
  token;
  authenticationState = new BehaviorSubject(false);

  constructor(private formBuilder: FormBuilder, private authService: AuthService
    , private storage: Storage, private details: UserDetailsUtilityService, private router: Router) { }

  ngOnInit() {
    this.storage.get('access_token').then((token) => {
      this.token = token;

      this.details.getUserDetails(token)
      .subscribe(data2 => {
        this.user = data2['data']['0'];
      });
    });
    this.credentialsForm = this.formBuilder.group({
      genre: [''],
      bios: ['', Validators.required],
      contactNumber: ['', [Validators.minLength(10),Validators.pattern(/^[0-9]{9,}$/)]],
    });
  }

  onSubmit() {
    this.details.editDetails(this.credentialsForm.value,this.token).subscribe();
  }

  moveToImage() {
    this.router.navigate(['/upload-image']);
  }
}