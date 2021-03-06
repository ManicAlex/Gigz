import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
  

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  credentialsForm: FormGroup;
 
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router:Router
    ) { }
 
  ngOnInit() {
    this.authService.authenticationState.subscribe(state => {
      if (state) {
        console.log('Logged in');
        this.router.navigate(['menu/profile']);
      } else {
        this.router.navigate(['login']);
      }
  });
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }
 
  register() {
    this.authService.register(this.credentialsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      let value = {
        email: this.credentialsForm.value.email,
        password: this.credentialsForm.value.password
      };
      this.authService.login(value).subscribe();
    })
  };
}