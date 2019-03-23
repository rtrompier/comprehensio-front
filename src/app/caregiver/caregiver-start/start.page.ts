import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TransactionService } from 'src/app/common/transaction/transaction.service';
import { Observable, merge, from } from 'rxjs';
import { switchMap, tap, first } from 'rxjs/operators';
import { Transaction } from 'src/app/common/transaction/transaction.model';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

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

  private loader: HTMLIonLoadingElement;

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

  public waitForTranslator() {
    const transaction = new Transaction();
    transaction.id = this.transactionId;
    transaction.state = 'PENDING';
    transaction.caller = this.authService.getUserProfile();

    const loading = this.loadingController.create({
      spinner: 'bubbles',
      message: 'Un interprète vous contactera sous 5 minutes...',
      cssClass: 'custom-class custom-loading'
    });

    from(loading)
      .pipe(
        switchMap((loader) => {
          this.loader = loader;
          return loader.present();
        }),
        switchMap(() => this.transactionService.updateTransaction(transaction)),
        switchMap(() => this.getIndicatorsStream()),
        first()
        // switchMap qui va attendre le translator ICI
      ).subscribe((t) => {
        this.loader.dismiss().then(() => this.loader = undefined);
        this.router.navigate(['/caregiver/recap', t.id]);
      });
  }

  public getIndicatorsStream(): Observable<any> {
    return Observable.create((observer) => {
      const eventSource = new EventSource(`${environment.api}/transactions/sse-caregiver/${this.transactionId}`);
      eventSource.onmessage = (event) => observer.next(JSON.parse(event.data));
      eventSource.onerror = (error) => observer.error(error);
    });
  }
}
