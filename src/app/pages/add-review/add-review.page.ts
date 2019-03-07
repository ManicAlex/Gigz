import { Component, OnInit } from '@angular/core';
import { UserDetailsUtilityService } from './../../services/user-details-utility.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { Router,ActivatedRoute } from '@angular/router';
import {ToastController} from '@ionic/angular';
import { Input, EventEmitter ,Output} from "@angular/core";

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {
  credentialsForm: FormGroup;
  id: number;
  @Input() rating: number ;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();;

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
      rating: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  onSubmit() {
    this.storage.get('access_token').then((token) => {
      this.details.storeReview(this.credentialsForm.value,token,this.id)
      .subscribe(res => {
        this.presentToast();
        this.router.navigate([`menu/profile`])
      })
    });
  }
  
  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }


  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.RED;
    }
    switch (this.rating){
      case 1:
      case 2:
      return COLORS.RED;
      case 3:
      return COLORS.YELLOW;
      case 4:
      case 5:
      return COLORS.GREEN;
      default:
      return COLORS.GREY;

    }
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your Review has been posted!',
      duration: 4000,
      color: 'success'
    });
    toast.present();
  }
  
}
enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2COO"
}

