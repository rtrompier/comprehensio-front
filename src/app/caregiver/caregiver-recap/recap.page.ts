import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/common/transaction/transaction.service';
import { Transaction } from 'src/app/common/transaction/transaction.model';
import { User } from 'src/app/common/user/user.model';
import { tap, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/common/user/user.service';

@Component({
  selector: 'app-caregiver-recap',
  templateUrl: 'recap.page.html',
  styleUrls: ['recap.page.scss']
})
export class CaregiverRecapPage implements OnInit {

  public transactionId: string;
  public receiver: User;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  public ngOnInit() {
    this.route.params
      .pipe(
        tap((params) => this.transactionId = params.transactionId),
        switchMap((params) => this.transactionService.getTransaction(params.transactionId)),
        switchMap((transaction) => this.userService.getUser(transaction.receiver.id))
      )
      .subscribe((user) => {
        this.receiver = user;
      });
  }

  public endConversation() {
    const transaction = new Transaction();
    transaction.id = this.transactionId;
    transaction.endDate = new Date();
    transaction.state = 'CLOSE';
    this.transactionService.updateTransaction(transaction)
      .subscribe((t) => {
        this.router.navigate(['/caregiver/end', t.id]);
      });
  }
}
