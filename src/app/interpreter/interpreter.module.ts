import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { InterpreterPage } from './interpreter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: InterpreterPage,
        children: [
          {path: 'home', loadChildren: './interpreter-home/home.module#InterpreterHomePageModule'},
          {path: 'start', loadChildren: './interpreter-start/start.module#InterpreterStartPageModule'},
          {path: 'recap', loadChildren: './interpreter-recap/recap.module#InterpreterRecapPageModule'},
          {path: 'end', loadChildren: './interpreter-end/end.module#InterpreterEndPageModule'},
          {path: '**', redirectTo: 'home'},
        ]
      },
    ])
  ],
  declarations: [InterpreterPage]
})
export class InterpreterPageModule {}
