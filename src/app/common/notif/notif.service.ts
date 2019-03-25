import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../transaction/transaction.model';

@Injectable({ providedIn: 'root' })
export class NotifService {
    public notifs: Transaction[] = [];
    public notif$ = new Subject<Transaction>();

    private zone = new NgZone({ enableLongStackTrace: false });

    constructor() {
        const source = new EventSource(`${environment.api}/transactions/sse-interpreter/1`);
        source.onerror = (err) => {
            this.notif$.error(err);
        };
        source.onmessage = this.onMessage.bind(this);
    }

    private onMessage = (message: any) => {
        const tr: Transaction = JSON.parse(message.data);
        console.log(message);
        // const tr = message.data;
        if (tr.state === 'PENDING') {
            this.notifs.push(tr);
        } else {
            const tmp = this.notifs.findIndex((t) => t.id === tr.id);
            if (tmp > -1) {
                this.notifs.splice(tmp, 1);
            }
        }
        this.zone.run(() => this.notif$.next(tr));
    }
}
