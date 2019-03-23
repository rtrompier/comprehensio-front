import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { InterpreterPage } from './interpreter.page';
import { TransactionResolver } from './interpreter-start/start.resolver';
import { InterpreterNotifModule } from './interpreter-notifs/notifs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterpreterNotifModule,
    MatToolbarModule,
    RouterModule.forChild([
      {
        path: '',
        component: InterpreterPage,
        children: [
          { path: 'home', loadChildren: './interpreter-home/home.module#InterpreterHomePageModule' },
          { path: 'start/:id', loadChildren: './interpreter-start/start.module#InterpreterStartPageModule', resolve: { transaction: TransactionResolver } },
          { path: 'recap/:id', loadChildren: './interpreter-recap/recap.module#InterpreterRecapPageModule' },
          { path: 'end/:id', loadChildren: './interpreter-end/end.module#InterpreterEndPageModule' },
          { path: '**', redirectTo: 'home' },
        ]
      },
    ])
  ],
  declarations: [InterpreterPage],
  providers: [
    TransactionResolver
  ]
})
export class InterpreterPageModule { }
