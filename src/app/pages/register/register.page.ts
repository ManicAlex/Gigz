import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConnectApiService, Config } from '../../services/connect-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialsForm: FormGroup;
  config: Config;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private api: ConnectApiService,
    private router: Router
    ) { }

  ngOnInit() {
    this.authService.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['menu/profile']);
      }
  });
    this.credentialsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      password_confirmation: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.register(this.credentialsForm.value).subscribe();
  }

  checkPasswordValidation() {
    if (this.credentialsForm.value.password !== this.credentialsForm.value.password_confirmation) {
      console.log(this.credentialsForm.value.password);
      return false;
    } else {
      console.log('true');
      return true;
    }
  }
}
