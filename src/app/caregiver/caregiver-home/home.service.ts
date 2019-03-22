import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from 'src/app/common/transaction/transaction.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class HomePageService {
    constructor(private httpClient: HttpClient) { }

    public createTransaction(from: string, to: string) {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json;charset=UTF-8');
        const transaction = new Transaction();
        transaction.fromLang = from;
        transaction.toLang = to;
        return this.httpClient.post<Transaction>(`${environment.api}/transactions`, transaction, {headers});
    }
}
