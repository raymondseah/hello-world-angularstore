import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { take, map } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggesIn.pipe(
      take(1),
      map((loginStatus: boolean) => {
        const destination: string = state.url;

        // To check if user is not logged in
        if (!loginStatus) {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });

          return false;
        } 
        return true;
      })
    );
  }
}

// else {
//   this.router.navigate(['/'], {
//     queryParams: { returnUrl: state.url },
//   });
// }