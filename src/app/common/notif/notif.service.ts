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
        const source = new EventSource(`${environment.api}/transactions/sse/1`);
        source.onerror = (err) => {
            this.notif$.error(err);
        };
        source.onmessage = (message: any) => {
            const tr = JSON.parse(message.data);
            console.log(message);
            // const tr = message.data;
            this.notifs.push(tr);
            this.zone.run(() => this.notif$.next(tr));
        };
    }
}
