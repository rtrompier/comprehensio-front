import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/common/transaction/transaction.model';
import { TransactionService } from 'src/app/common/transaction/transaction.service';

@Injectable()
export class TransactionResolver implements Resolve<Observable<Transaction>> {
  constructor(
      private transactionService: TransactionService,
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.transactionService.getTransaction(route.paramMap.get('id'));
  }
}
