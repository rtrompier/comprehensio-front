import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    public saveUser(): Observable<User> {
        return this.httpClient.post<User>(`${environment.api}/users`, null);
    }
}
