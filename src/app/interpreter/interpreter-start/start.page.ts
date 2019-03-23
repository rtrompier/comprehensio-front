import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/common/transaction/transaction.model';
import { TransactionService } from 'src/app/common/transaction/transaction.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-interpreter-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss']
})
export class InterpreterStartPage implements OnInit {

  public transaction: Transaction;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private userService: TransactionService,
  ) {
  }

  ngOnInit() {
    this.transaction = this.route.snapshot.data.transaction;
  }

  public startTransaction(): void {
    this.transaction.startDate = new Date();
    this.transaction.state = 'INPROGRESS';
    this.transactionService.updateTransaction(this.transaction).subscribe((transaction) => {
      this.transaction = transaction;
      // call the caregiver
      window.open(`facetime://${transaction.caller.email}`, '_blank');
    });
  }
}
