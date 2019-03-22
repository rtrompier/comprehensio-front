import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/common/transaction/transaction.service';
import { Transaction } from 'src/app/common/transaction/transaction.model';
import { LangService } from 'src/app/common/lang/lang.service';
import { Lang } from 'src/app/common/lang/lang.module';

@Component({
  selector: 'app-caregiver-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class CaregiverHomePage implements OnInit {

  public langs: Lang[];

  public selectedFrom: Lang;
  public selectedTo: Lang;

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private langService: LangService,
  ) {
  }

  public ngOnInit() {
    this.langService.getLangs()
      .subscribe((langs) => {
        this.langs = langs;
        this.selectedFrom = this.langs.find((l) => l.id === 'fra');
        this.selectedTo = this.langs.find((l) => l.id === 'eng');
      });
  }

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
