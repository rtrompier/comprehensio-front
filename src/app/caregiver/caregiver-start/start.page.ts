import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TransactionService } from 'src/app/common/transaction/transaction.service';
import { Observable, merge, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Transaction } from 'src/app/common/transaction/transaction.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-caregiver-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss']
})
export class CaregiverStartPage implements OnInit {

  public from: string;
  public to: string;
  public transactionId: string;
  public showWaitingBackdrop = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loadingController: LoadingController,
    private transactionService: TransactionService,
    private authService: AuthService,
  ) { }

  public ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.from = params.from;
      this.to = params.to;
    });

    this.route.params.subscribe((params) => {
      this.transactionId = params.transactionId;
    });
  }

  public async waitForTranslator() {
    const transaction = new Transaction();
    transaction.id = this.transactionId;
    transaction.state = 'PENDING';
    transaction.caller = this.authService.getUserProfile();

    const loading = this.loadingController.create({
      spinner: 'bubbles',
      duration: 2000,
      message: 'Un interprète vous contactera sous 5 minutes...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    from(loading)
      .pipe(
        switchMap(() => this.transactionService.updateTransaction(transaction))
      ).subscribe((t) => this.router.navigate(['/caregiver/recap', t.id]) );
  }
}
