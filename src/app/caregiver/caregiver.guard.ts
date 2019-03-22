import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class CareGiverGuard implements CanActivate {
    constructor(
        private authService: AuthService,
    ) { }

    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated()
            .pipe(
                map((isAuth: boolean) => {
                    if (!isAuth) {
                        this.authService.login();
                    }
                    return this.authService.getUserProfile();
                }),
                map((user) => {
                    const tmp = user.roles.findIndex((rol) => rol.id === 'caregiver');
                    if (tmp !== -1) {
                        return true;
                    }
                    return false;
                })
            );
    }
}
