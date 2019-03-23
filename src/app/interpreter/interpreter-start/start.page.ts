import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/common/transaction/transaction.model';
import { TransactionService } from 'src/app/common/transaction/transaction.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-interpreter-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss']
})
export class InterpreterStartPage implements OnInit {

  public transaction: Transaction;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.transaction = this.route.snapshot.data.transaction;
  }

  public startTransaction(): void {
    this.transaction.startDate = new Date();
    this.transaction.state = 'INPROGRESS';
    this.transaction.receiver = this.authService.getUserProfile();
    this.transactionService.updateTransaction(this.transaction).subscribe((transaction) => {
      this.transaction = transaction;
      // call the caregiver
      window.open(`facetime://${transaction.caller.email}`, '_blank');
      this.router.navigate(['/interpreter/end', transaction.id]);
    });
  }
}
