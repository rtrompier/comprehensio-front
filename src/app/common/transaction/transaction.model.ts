import { State } from './state.model';

export class Transaction {
    public id: string;
    public startDate: Date;
    public endDate: Date;
    public comment: string;
    public price: string;
    public state: State;
    public caller: any;
    public receiver: any;
    public fromLang: any;
    public toLang: any;
    public note: any;
}
