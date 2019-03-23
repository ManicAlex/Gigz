import { Component, OnInit } from '@angular/core';
import { UserDetailsUtilityService } from 'src/app/services/user-details-utility.service';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  constructor(
    private service: UserDetailsUtilityService,
    private storage: Storage,
    private router: Router,
    private actRoute: ActivatedRoute,
    public toastController: ToastController,
    private formBuilder: FormBuilder
    ) { }

    id: number;
    user;
    success: boolean;
    credentialsForm: FormGroup;
    token: string;
    reviews;
    test: any;

  ngOnInit() {
    this.user = {
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
    this.actRoute.queryParams.subscribe(params => {
       this.id = params['id'];
    });
    if (!this.id) {
      this.presentNoIDToast();
      this.router.navigate(['list-bands']);
    }
    this.storage.get('access_token').then((token) => {
      this.token = token;
      this.service.getUserById(token, this.id).subscribe(val => {
        this.user = val['data'][0];
        console.log(this.id);
      });
    });
    console.log(this.token);
    console.log(this.user);
    this.storage.get('access_token').then((token) => {
      console.log(this.id);
      this.service.showReviewsById(token, this.id).subscribe(val => {
        this.reviews = val['data'];
          console.log(val['data']);
        }
      );
  });
    this.credentialsForm = this.formBuilder.group({
      rating: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }

  book() {
    this.router.navigate(['menu/send-request'], { queryParams: { id: this.id } });
  }

  onSubmit() {
    this.storage.get('access_token').then((token) => {
      this.service.storeReview(this.credentialsForm.value, token, this.user['id']).subscribe(
        res => {
          if (res['success']) {
            this.service.presentPositiveToast('Review added successfully');
            this.service.showReviewsById(token, this.id).subscribe(val => {
              this.reviews = val['data'];
                console.log(val['data']);
              }
            );
          } else {
            this.service.presentToast('Review failed to be added');
          }
        }
      );
    }
    );
  }

  storeFav(id) {
    console.log('clicked');
    this.storage.get('access_token').then(
      token => {
        this.service.storeFav(id, token).subscribe(
          res => {
            if (res['success']) {
              this.service.presentPositiveToast('Added to favourites');
            } else {
              this.service.presentToast('Failed to add to favourites');
            }
          }
        );
      }
    );
  }

  async presentNoIDToast() {
    const toast = await this.toastController.create({
      message: 'No user ID selected',
      duration: 4000,
      color: 'danger'
    });
    toast.present();
  }

  findIfEmpty() {
    if (this.reviews['length'] === 0) {
      return true;
    } else {
      return false;
    }
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.test = {

      };
    }, 3000);
  }
}
