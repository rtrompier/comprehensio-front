import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CaregiverHomePage } from './home.page';
import { HomePageService } from './home.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatSelectModule,
    RouterModule.forChild([
      {
        path: '',
        component: CaregiverHomePage
      }
    ])
  ],
  declarations: [
    CaregiverHomePage,
  ],
  providers: [
    HomePageService,
  ]
})
export class CaregiverHomePageModule {}
