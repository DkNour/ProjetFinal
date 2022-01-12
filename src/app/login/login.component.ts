import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/AuthService';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer)  { 
      this.matIconRegistry.addSvgIcon(
        "logo",
        this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    }

  ngOnInit(): void {
  }

 tryGoogleLogin(): void {
  
    this.authService.doGoogleLogin()
      .then(() => this.successRedirect())
      .catch(error => console.log(error))
      .finally(() => {
      });
      
      
  }
  

  successRedirect(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.ngZone.run(() => this.router.navigate(['login']));
    //console.log("red")
  }
}

/*function googleLogoURL(googleLogoURL: any): import("@angular/platform-browser").SafeResourceUrl {
  throw new Error('Function not implemented.');
}*/

