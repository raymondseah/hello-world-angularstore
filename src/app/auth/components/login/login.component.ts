import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  returnUrl!: string;

  ngOnInit(): void {}

  async onSubmit(f: NgForm) {
    const loginObserver = {
      next: (x: any) => console.log('User logged in' + x),
      error: (err: any) => console.log(err),
      complete: () => this.router.navigateByUrl('/'),
    };

    const res = await this.authService.login(f.value).subscribe(loginObserver);
    this.reloadPage();
  }

  reloadPage() {
    setTimeout(() => {
      location.reload();

    }, 500);
  }
}
