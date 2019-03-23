import { NgModule } from '@angular/core';

import { InterpreterNotifsComponent } from './notifs.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
    ],
    exports: [],
    declarations: [InterpreterNotifsComponent],
    entryComponents: [InterpreterNotifsComponent],
    providers: [],
})
export class InterpreterNotifModule { }
