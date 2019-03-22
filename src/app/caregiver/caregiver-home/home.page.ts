import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/common/transaction/transaction.service';
import { Transaction } from 'src/app/common/transaction/transaction.model';

@Component({
  selector: 'app-caregiver-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class CaregiverHomePage implements OnInit {

  public langs = [
    {id: 'FRA', label: 'Français'},
    {id: 'ENG', label: 'Anglais'},
  ];

  public selectedFrom = this.langs[1];
  public selectedTo = this.langs[0];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
  ) {
  }

  ngOnInit() { }

  public createTransaction() {
    const transaction = new Transaction();
    transaction.fromLang = this.selectedFrom;
    transaction.toLang = this.selectedTo;
    this.transactionService.createTransaction(transaction)
      .subscribe((t) => {
        this.router.navigate(['/caregiver/start', t.id], {queryParams: {from: this.selectedFrom.label, to: this.selectedTo.label}, queryParamsHandling: 'merge'});
      });
  }
}
