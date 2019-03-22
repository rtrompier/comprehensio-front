import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transaction.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TransactionService {
    constructor(private httpClient: HttpClient) { }

    public getTransaction(id: string): Observable<Transaction> {
        return this.httpClient.get<Transaction>(`${environment.api}/transactions/${id}`);
    }

    public updateTransaction(transaction: Transaction): Observable<Transaction> {
        return this.httpClient.put<Transaction>(`${environment.api}/transactions/${transaction.id}`, transaction);
    }
}
