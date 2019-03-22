import { Component, OnInit } from '@angular/core';
import { HomePageService } from './home.service';
import { Router } from '@angular/router';

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
    private homePageService: HomePageService,
    private router: Router,
  ) {
  }

  ngOnInit() { }

  public createTransaction() {
    this.homePageService.createTransaction(this.selectedFrom, this.selectedTo)
      .subscribe((transaction) => {
        debugger;
        this.router.navigate(['/caregiver/start', transaction.id], {queryParams: {from: this.selectedFrom.label, to: this.selectedTo.label}, queryParamsHandling: 'merge'});
      });
  }
}
