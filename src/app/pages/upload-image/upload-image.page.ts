import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserDetailsUtilityService } from 'src/app/services/user-details-utility.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {

  constructor(
    private storage: Storage,
    private details: UserDetailsUtilityService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  credentialsForm: FormGroup;

  ngOnInit() {
    this.credentialsForm = this.fb.group({
      avatar: [null, Validators.required]
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.credentialsForm.patchValue({
          file: reader.result
       });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }
  onSubmit() {
    console.log('attempted...');
    this.storage.get('access_token').then(
      token => {
        console.log(token);
        console.log(this.credentialsForm);
        this.details.uploadImage(token, this.credentialsForm.value).subscribe(
          res => {
            console.log(res);
          }
        );
      }
    );
  }

}
