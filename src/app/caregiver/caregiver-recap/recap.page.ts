import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/common/transaction/transaction.service';
import { Transaction } from 'src/app/common/transaction/transaction.model';

@Component({
  selector: 'app-caregiver-recap',
  templateUrl: 'recap.page.html',
  styleUrls: ['recap.page.scss']
})
export class CaregiverRecapPage implements OnInit {

  public transactionId: string;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.transactionId = params.transactionId;
    });
  }

  public endConversation() {
    const transaction = new Transaction();
    transaction.id = this.transactionId;
    transaction.endDate = new Date();
    this.transactionService.updateTransaction(transaction)
      .subscribe((t) => {
        this.router.navigate(['/caregiver/end', t.id]);
      });
  }
}
