import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './default/default.module#DefaultPageModule'
  },
  {
    path: 'caregiver',
    loadChildren: './caregiver/caregiver.module#CaregiverPageModule'
  },
  {
    path: 'interpreter',
    loadChildren: './interpreter/interpreter.module#InterpreterPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
