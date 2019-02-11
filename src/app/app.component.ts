import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserDetailsUtilityService } from './services/user-details-utility.service';
 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private userDetails: UserDetailsUtilityService,
    private storage: Storage
  ) {
    this.initializeApp();
  }
 
  initializeApp() {
      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      

      
 
    });
  }
}