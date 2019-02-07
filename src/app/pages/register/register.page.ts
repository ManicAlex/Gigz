import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConnectApiService, Config } from '../../services/connect-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialsForm: FormGroup;
  config: Config;
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private api: ConnectApiService) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.register(this.credentialsForm.value).subscribe();
  }
}
