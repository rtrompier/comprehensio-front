import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lang } from './lang.module';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class LangService {
    constructor(private httpClient: HttpClient) { }

    public getLangs(): Observable<Lang[]> {
        return this.httpClient.get<Lang[]>(`${environment.api}/langs`);
    }
}
