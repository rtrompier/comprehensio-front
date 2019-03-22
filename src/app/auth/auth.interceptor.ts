import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.injectAuthTokenIfNeeded(request))
            .pipe(
                tap(noop, (error: any) => this.catch401(error))
            );
    }

    // ---- HELPER(s) ----

    private injectAuthTokenIfNeeded(request: HttpRequest<any>): HttpRequest<any> {
        const token = this.authService.getAccessToken();
        if (token) {
            return request.clone({
                headers: new HttpHeaders().append(
                    'Authorization', `Bearer ${token}`
                )
            });
        }
        return request;
    }

    private catch401(error: any) {
        if ((error instanceof HttpErrorResponse) && (error.status === 401)) {
            this.authService.login();
        }
    }
}
