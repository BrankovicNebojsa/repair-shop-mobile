import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  isLoading = false;
  logInForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  ngOnInit() {}

  onLogIn() {
    this.isLoading = true;
    console.log(this.logInForm);
    this.authService.logIn(this.logInForm.value).subscribe((resData) => {
      console.log('Log in completed!');
      console.log(resData);
      this.isLoading = false;
      this.router.navigateByUrl('/brands/tabs/explore');
    });
  }
}
