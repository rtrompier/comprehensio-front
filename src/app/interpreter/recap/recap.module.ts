import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { InterpreterRecapPage } from './recap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: InterpreterRecapPage
      }
    ])
  ],
  declarations: [InterpreterRecapPage]
})
export class InterpreterRecapPageModule {}
