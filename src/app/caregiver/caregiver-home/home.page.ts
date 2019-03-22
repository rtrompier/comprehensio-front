import { Component, OnInit } from '@angular/core';
import { HomePageService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caregiver-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class CaregiverHomePage implements OnInit {

  public selectedFrom = 'ENG';
  public selectedTo = 'FRA';

  constructor(
    private homePageService: HomePageService,
    private router: Router,
  ) {
  }

  ngOnInit() { }

  public createTransaction() {
    this.homePageService.createTransaction(this.selectedFrom, this.selectedTo)
      .subscribe((transaction) => {
        debugger;
        this.router.navigate(['/caregiver/start', transaction.id], {queryParams: {from: this.selectedFrom, to: this.selectedTo}, queryParamsHandling: 'merge'});
      });
  }
}
