import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private _user;
  email: string = "email";

  constructor(private authService: AuthService) {
    this._user = new BehaviorSubject<User | null>(
      new User('1', '1', '1', new Date())
    );
  }

  ngOnInit() {
    this._user = this.authService.user;
    this.email = this._user.value?.email!;
  }
}
