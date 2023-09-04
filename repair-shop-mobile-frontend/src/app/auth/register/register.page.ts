import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  ngOnInit() {}

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Valid');
      this.loadingController
        .create({ message: 'Registering...' })
        .then((loadingEl) => {
          loadingEl.present();
          this.authService
            .register(this.registerForm.value)
            .subscribe((resData) => {
              console.log('Registration complete!');
              console.log(resData);
              loadingEl.dismiss();
              this.router.navigateByUrl('brands');
            });
        });
    }
  }

  onSignIn() {
    this.router.navigateByUrl('/log-in');
  }
}
