import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  isLoading = false;
  logInForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
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
    this.authService.logIn(this.logInForm.value).subscribe(
      (resData) => {
        console.log('Log in completed!');
        this.isLoading = false;
        this.router.navigateByUrl('/brands/tabs/explore');
      },
      (errorRes) => {
        console.log(errorRes);
        this.isLoading = false;
        let message = 'Incorrect email or password!';

        const code = errorRes.error.error.message;
        if (code === "EMAIL_NOT_FOUND") {
          message = 'Email could not be found!';
        } else if (code === "INVALID_PASSWORD") {
          message = 'Invalid password';
        }

        this.alertController
          .create({
            header: 'Authentication failed',
            message,
            buttons: ['Okay'],
          })
          .then((alert) => {
            alert.present();
          });

          this.logInForm.reset();
      }
    );
  }

  onSignUp() {
    this.router.navigateByUrl('/register');
  }
}
