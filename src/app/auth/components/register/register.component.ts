import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    const RegisterObserver = {
      next: (x: any) => console.log('User Created'),
      error: (err: any) => console.log(err),
    };

    this.authService.register(f.value).subscribe(RegisterObserver);
    // console.log(f.value); // { first: '', last: '' }
    // console.log(f.valid); // false
  }
}
