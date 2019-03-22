import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-caregiver-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss']
})
export class CaregiverStartPage implements OnInit {

  public from: string;
  public to: string;
  public showWaitingBackdrop = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loadingController: LoadingController,
  ) { }

  public ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.from = params.from;
      this.to = params.to;
    });
  }

  public async waitForTranslator() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 2000,
      message: 'Un interprète vous contactera sous 5 minutes...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    await loading.onDidDismiss();
    this.router.navigate(['/caregiver/recap']);
  }
}
