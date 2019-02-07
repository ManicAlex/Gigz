import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConnectApiService, Config } from '../../services/connect-api.service';
  

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  credentialsForm: FormGroup;
  config: Config;
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private api: ConnectApiService) { }
 
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }
 
  register() {
    console.log(this.credentialsForm.value);
    this.authService.register(this.credentialsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      let value = {
        email: this.credentialsForm.value.email,
        password: this.credentialsForm.value.password
      };
      this.authService.login(value).subscribe();
    })
  };

  showConfig() {
    this.api.getConfig()
      .subscribe((data: Config) => this.config = {
          heroesUrl: data['heroesUrl'],
          textfile:  data['textfile']
      });
  }
  
 
}