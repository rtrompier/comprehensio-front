import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated()
            .pipe(
                map((isAuth: boolean) => {
                    if (!isAuth) {
                        this.authService.login();
                    }

                    const u = this.authService.getUserProfile();
                    const roles = u.roles.map((rol) => rol.id).join(', ');

                    if (roles.includes('caregiver')) {
                        this.router.navigate(['/caregiver']);
                    } else if (roles.includes('interpreter')) {
                        this.router.navigate(['/interpreter']);
                    }
                    return isAuth;
                })
            );
    }
}
