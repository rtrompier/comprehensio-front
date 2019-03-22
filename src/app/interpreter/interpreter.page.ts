import { Component, OnInit } from '@angular/core';
import { NotifService } from '../common/notif/notif.service';
import { Transaction } from '../common/transaction/transaction.model';

@Component({
  selector: 'app-interpreter',
  templateUrl: 'interpreter.page.html',
  styleUrls: ['interpreter.page.scss']
})
export class InterpreterPage implements OnInit {

  public notifs: Transaction[] = [];

  constructor(
    private notifService: NotifService,
  ) { }

  public ngOnInit() {
    this.notifService.notif$.subscribe((notif) => {
      console.log(notif);
      this.notifs.push(notif);
    });
  }
}
