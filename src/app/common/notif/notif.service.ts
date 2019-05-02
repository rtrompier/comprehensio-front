import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../transaction/transaction.model';

@Injectable({ providedIn: 'root' })
export class NotifService {
    public notifs: Transaction[] = [];
    public notif$: Observable<Transaction>;

    private zone = new NgZone({ enableLongStackTrace: false });

    constructor() {
        this.notif$ = this.listen();
        this.notif$.subscribe();
    }

    public listen(): Observable<Transaction> {
        return Observable.create((observer) => {
            const test = new Date().getTime();
            const eventSource = new EventSource(`${environment.api}/transactions/sse-interpreter/${test}`);
            eventSource.onmessage = (event) => {
                observer.next(this.onMessage(event));
            };
            eventSource.onerror = (error) => {
                console.error(error);
                observer.error(error);
            };
        });
    }

    private onMessage = (message: any) => {
        const tr: Transaction = JSON.parse(message.data);
        console.log(message);
        if (tr.state === 'PENDING') {
            this.notifs.push(tr);
            return tr;
        } else {
            const tmp = this.notifs.findIndex((t) => t.id === tr.id);
            if (tmp > -1) {
                this.notifs.splice(tmp, 1);
            }
            return tr;
        }
    }
}
