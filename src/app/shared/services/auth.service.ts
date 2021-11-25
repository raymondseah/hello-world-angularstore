import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = 'http://localhost:5000/api/';

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private http: HttpClient, private router: Router) {}

  login(model: any) {
    let options = { withCredentials: true };

    return this.http.post(this.authUrl + 'login', model, options).pipe(
      map((response: any) => {
        const data = response;
        console.log(data);
        // const jwt = data.jwt;
        // document.cookie = `jwt1=${jwt}`
        // let x = document.cookie;
        // console.log(x)
      })
    );
  }

  reloadPage() {
    setTimeout(() => {
      this.reloadPage();
    }, 1000);
  }

  register(model: any) {
    return this.http.post(this.authUrl + 'register', model).pipe(
      map((response: any) => {
        const data = response;
        console.log(data);
        // if (data.message == 'success') {
        //   localStorage.setItem('authtoken', data.jwt);
        // }
      })
    );
  }
  getCookie(name: any) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  checkLoginStatus() {
    var x = this.getCookie('jwt');
    if (x) {
      console.log(x)
      return true;
    } else {
      return false;
    }
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  logout() {
    // Set Loginstatus to false and delete saved jwt cookie
    this.loginStatus.next(false);
    this.eraseCookie('jwt');
    this.router.navigate(['/']);
    console.log('Logged Out Successfully');
  }

  eraseCookie(name: any) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }
  // checkLoginStatus(): boolean {
  //   var loginCookie = localStorage.getItem('loginStatus');

  //   if (loginCookie == '1') {
  //     if (
  //       localStorage.getItem('jwt') === null ||
  //       localStorage.getItem('jwt') === undefined
  //     ) {
  //       return false;
  //     }

  //     // Get and Decode the Token
  //     const token = localStorage.getItem('jwt');
  //     const decoded = jwt_decode(token);
  //     // Check if the cookie is valid

  //     if (decoded.exp === undefined) {
  //       return false;
  //     }

  //     // Get Current Date Time
  //     const date = new Date(0);

  //     // Convert EXp Time to UTC
  //     let tokenExpDate = date.setUTCSeconds(decoded.exp);

  //     // If Value of Token time greter than

  //     if (tokenExpDate.valueOf() > new Date().valueOf()) {
  //       return true;
  //     }

  //     console.log('NEW DATE ' + new Date().valueOf());
  //     console.log('Token DATE ' + tokenExpDate.valueOf());

  //     return false;
  //   }
  //   return false;
  // }
}
