import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caregiver-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class CaregiverHomePage implements OnInit {

  public selectedFrom = 'en';
  public selectedTo = 'fr';

  constructor() {
  }

  ngOnInit() { }
}
