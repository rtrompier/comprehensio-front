import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    constructor(
        private platform: Platform,
        private authService: AuthService,
        private router: Router,
    ) { }

    public ngOnInit() {
        this.platform.ready().then(() => {
            this.authService.isAuthenticated().subscribe((isAuth) => {
                if (isAuth) {
                    this.router.navigate(['/']);
                } else {
                    this.authService.login('/');
                }
            });
        });
    }
}
