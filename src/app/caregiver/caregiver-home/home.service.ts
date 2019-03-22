import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from 'src/app/common/transaction/transaction.model';

@Injectable()
export class HomePageService {
    constructor(private httpClient: HttpClient) { }

    public createTransaction(from: string, to: string) {
        // return this.httpClient.post<Transaction>('', {});
    }
}
