import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from 'src/app/common/transaction/transaction.model';
import { environment } from 'src/environments/environment';
import { Lang } from 'src/app/common/lang/lang.module';

@Injectable()
export class HomePageService {
    constructor(private httpClient: HttpClient) { }

    public createTransaction(from: Lang, to: Lang) {
        const transaction = new Transaction();
        transaction.fromLang = from;
        transaction.toLang = to;
        return this.httpClient.post<Transaction>(`${environment.api}/transactions`, transaction);
    }
}
