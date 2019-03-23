import { NgModule } from '@angular/core';

import { InterpreterNotifsComponent } from './notifs.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [],
    declarations: [InterpreterNotifsComponent],
    entryComponents: [InterpreterNotifsComponent],
    providers: [],
})
export class InterpreterNotifModule { }
