import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CaregiverPage } from './caregiver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CaregiverPage,
        children: [
          {path: 'home', loadChildren: './caregiver-home/home.module#CaregiverHomePageModule'},
          {path: 'start/:id', loadChildren: './caregiver-start/start.module#CaregiverStartPageModule'},
          {path: 'recap/:id', loadChildren: './caregiver-recap/recap.module#CaregiverRecapPageModule'},
          {path: 'end/:id', loadChildren: './caregiver-end/end.module#CaregiverEndPageModule'},
          {path: '**', redirectTo: 'home'},
        ]
      },
    ])
  ],
  declarations: [CaregiverPage]
})
export class CaregiverPageModule {}
