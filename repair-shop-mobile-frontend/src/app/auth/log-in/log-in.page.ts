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
    console.log(this.logInForm);
    this.authService.logIn();
    this.router.navigateByUrl('/brands/tabs/explore');
  }
}
