import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/user/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/common/user/user.model';

@Component({
  selector: 'app-interpreter-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class InterpreterHomePage implements OnInit {

  public user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserProfile();
  }

  public updateAvalaibility(availability: boolean): void {
    this.user.isAvailable = availability;
    this.userService.saveUser(this.user).subscribe((u) => {
      this.authService.setUserProfile(u);
      this.user = u;
    });
  }
}
