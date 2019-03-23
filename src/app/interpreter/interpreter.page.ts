import { Component, OnInit } from '@angular/core';
import { NotifService } from '../common/notif/notif.service';
import { Transaction } from '../common/transaction/transaction.model';
import { PopoverController } from '@ionic/angular';
import { InterpreterNotifsComponent } from './interpreter-notifs/notifs.component';

@Component({
  selector: 'app-interpreter',
  templateUrl: 'interpreter.page.html',
  styleUrls: ['interpreter.page.scss']
})
export class InterpreterPage implements OnInit {

  public notifs: Transaction[] = [];

  constructor(
    private notifService: NotifService,
    public popoverController: PopoverController
  ) { }

  public ngOnInit() {
    this.notifService.notif$.subscribe((notif) => {
      console.log(notif);
      this.notifs.push(notif);
    });
  }

  public async openTransactions(ev: any) {
    const popover = await this.popoverController.create({
      component: InterpreterNotifsComponent,
      event: ev,
      translucent: false
    });
    await popover.present();
  }
}
