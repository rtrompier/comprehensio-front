import { Injectable, NgZone } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../transaction/transaction.model';

@Injectable({ providedIn: 'root' })
export class NotifService {
    public notif$ = new Subject<Transaction>();

    private zone = new NgZone({ enableLongStackTrace: false });

    constructor() {
        const source = new EventSource(`${environment.api}/transactions/stream-sse`);
        source.onerror = (err) => {
            this.notif$.error(err);
        };
        source.onmessage = (message: any) => {
            // const tr = JSON.parse(message.data);
            const tr = message.data;
            this.zone.run(() => this.notif$.next(tr));
        };
    }
}
