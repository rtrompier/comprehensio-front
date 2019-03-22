import * as Keycloak_ from 'keycloak-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../common/user/user.model';
import { UserService } from '../common/user/user.service';
import { KeycloakConfig } from './keycloak-config.model';
import { Injectable } from '@angular/core';

const Keycloak = Keycloak_;

@Injectable()
export class AuthService {
    private readonly TOKEN_KEY = 'KeycloakAuthService_token';
    private readonly REFRESH_TOKEN_KEY = 'KeycloakAuthService_refreshToken';
    private readonly ID_TOKEN_KEY = 'KeycloakAuthService_idToken';

    private config: KeycloakConfig;
    private keycloak: Keycloak.KeycloakInstance;
    private userProfile: User;
    private isAuth = new BehaviorSubject<boolean>(false);

    constructor(
        private userService: UserService,
    ) { }

    public isAuthenticated(): Observable<boolean> {
        return this.isAuth;
    }

    public init(settings: KeycloakConfig): Promise<any> {
        this.config = settings;
        this.keycloak = Keycloak(this.config);

        this.keycloak.onTokenExpired = this.onTokenExpired.bind(this);
        this.keycloak.onAuthSuccess = this.onAuthSuccess.bind(this);

        this.config.initOptions.token = sessionStorage.getItem(this.TOKEN_KEY);
        this.config.initOptions.refreshToken = sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
        this.config.initOptions.idToken = sessionStorage.getItem(this.ID_TOKEN_KEY);
        return this.keycloakPromiseToPromise(this.keycloak.init(this.config.initOptions))
            .then((isAuth: boolean) => {
                const tk = this.decodeToken(this.getAccessToken());
                if (!isAuth && tk) {
                    isAuth = new Date(tk.exp * 1000) > new Date();
                }
                return isAuth ? this.onAuthSuccess() : this.removeUser();
            });
    }

    public login(redirectUrl?: string): Promise<any> {
        const loginOptions: Keycloak.KeycloakLoginOptions = redirectUrl ? { redirectUri: `${window.location.origin}${redirectUrl}` } : {};
        return new Promise((resolve, error) => {
            this.keycloak
                .login(loginOptions)
                .success(() => resolve())
                .error(() => error());
        });
    }

    public logout(redirectUrl?: string): Promise<any> {
        const logoutOptions = redirectUrl ? { redirectUri: `${window.location.origin}${redirectUrl}` } : {};
        return this.removeUser().finally(() => this.keycloak.logout(logoutOptions));
    }

    public getUserProfile(): User {
        return this.userProfile;
    }

    public getAccessToken(): string {
        return sessionStorage.getItem(this.TOKEN_KEY) || this.keycloak.token;
    }

    private onTokenExpired() {
        this.removeUser();
        if (this.keycloak) {
            this.keycloak.updateToken(0);
        }
    }

    private onAuthSuccess(): Promise<any> {
        this.keycloak.token = this.getAccessToken();
        return this.userService.saveUser()
            .pipe(
                tap((usr: User) => {
                    this.userProfile = usr;
                    if (this.keycloak.token) {
                        sessionStorage.setItem(this.TOKEN_KEY, this.keycloak.token);
                    }
                    if (this.keycloak.refreshToken) {
                        sessionStorage.setItem(this.REFRESH_TOKEN_KEY, this.keycloak.refreshToken);
                    }
                    if (this.keycloak.idToken) {
                        sessionStorage.setItem(this.ID_TOKEN_KEY, this.keycloak.idToken);
                    }
                    this.isAuth.next(true);
                }),
                catchError((err) => {
                    // Token is probably not valid => disconnect user
                    this.removeUser();
                    return null;
                })
            )
            .toPromise();
        // return this.keycloakPromiseToPromise(this.keycloak.loadUserInfo())
        //     .then((usr) => {
        //         this.userProfile = usr;
        //         if (this.keycloak.token) {
        //             sessionStorage.setItem(this.TOKEN_KEY, this.keycloak.token);
        //         }
        //         if (this.keycloak.refreshToken) {
        //             sessionStorage.setItem(this.REFRESH_TOKEN_KEY, this.keycloak.refreshToken);
        //         }
        //         if (this.keycloak.idToken) {
        //             sessionStorage.setItem(this.ID_TOKEN_KEY, this.keycloak.idToken);
        //         }
        //         this.isAuth.next(true);
        //     }).catch(() => {
        //         // Token is probably not valid => disconnect user
        //         this.removeUser();
        //     });
    }

    private removeUser(): Promise<void> {
        this.isAuth.next(false);
        this.userProfile = null;
        this.keycloak.clearToken();
        sessionStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(this.ID_TOKEN_KEY);
        return Promise.resolve();
    }

    private keycloakPromiseToPromise(pr: Keycloak.KeycloakPromise<any, any>): Promise<any> {
        return new Promise((resolve, error) => {
            pr.success((val) => resolve(val)).error((err) => error(err));
        });
    }

    private decodeToken(str): any {
        if (!str) {
            return null;
        }

        str = str.split('.')[1];

        str = str.replace('/-/g', '+');
        str = str.replace('/_/g', '/');
        switch (str.length % 4) {
            case 0:
                break;
            case 2:
                str += '==';
                break;
            case 3:
                str += '=';
                break;
            default:
                throw new Error('Invalid token');
        }

        str = (str + '===').slice(0, str.length + (str.length % 4));
        str = str.replace(/-/g, '+').replace(/_/g, '/');

        str = decodeURIComponent(escape(atob(str)));

        str = JSON.parse(str);
        return str;
    }
}
