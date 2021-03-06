import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/common/transaction/transaction.service';
import { switchMap } from 'rxjs/operators';
import { Transaction } from 'src/app/common/transaction/transaction.model';

@Component({
  selector: 'app-caregiver-end',
  templateUrl: 'end.page.html',
  styleUrls: ['end.page.scss']
})
export class CaregiverEndPage implements OnInit {

  public transaction: Transaction;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => this.transactionService.getTransaction(params.transactionId)),
      )
      .subscribe((transaction) => {
        this.transaction = transaction;
      });
  }

  public getTimeInSec() {
    if (this.transaction.endDate && this.transaction.startDate) {
      const diff = new Date(this.transaction.endDate).getTime() - new Date(this.transaction.startDate).getTime();
      return Math.floor((diff / 1000));
    } else {
      return null;
    }
  }
}
