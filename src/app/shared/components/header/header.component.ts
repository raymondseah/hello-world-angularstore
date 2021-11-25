// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  LoginStatus$: Observable<boolean>;
  // LoggedIn: Boolean;

  ngOnInit(): void {
    this.LoginStatus$ = this.authService.isLoggesIn;
    console.log(this.LoginStatus$)
    // this.IsLoggedIn();
    // this.UserName$ = this.acct.currentUserName;
  }
  async IsLoggedIn() {
    let status = await this.authService.checkLoginStatus();
    console.log(status)
    this.LoggedIn = status;
  }

  logOut(){
    this.authService.logout();
    location.reload();
  }
}
