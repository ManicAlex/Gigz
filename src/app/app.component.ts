import { Component } from '@angular/core';
 
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
    private userDetails: UserDetailsUtilityService
  ) {
    this.initializeApp();
  }
 
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      // this.userDetails.authenticationState.subscribe(state => {
      //   if (state) {
      //     this.router.navigate(['inside']);
      //   } else {
      //     console.log('Error – add validation')
      //   }
      // });

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['inside']);
        } else {
          this.router.navigate(['login']);
        }
      });

      this.authService.halfRegisteredState.subscribe(state => {
        if (state) {
          this.router.navigate(['add-details']);
        } else {
          this.router.navigate(['login']);
        }
      });

      
 
    });
  }
}