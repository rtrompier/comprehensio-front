import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/common/notif/notif.service';
import { Transaction } from 'src/app/common/transaction/transaction.model';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'notifs',
    styleUrls: ['notifs.component.scss'],
    templateUrl: 'notifs.component.html'
})
export class InterpreterNotifsComponent implements OnInit {

    public transactions: Transaction[] = [];

    constructor(
        private notifService: NotifService,
        private popoverController: PopoverController,
    ) { }

    ngOnInit() {
        this.transactions = this.notifService.notifs;
    }

    public close() {
        this.popoverController.dismiss();
    }
}
