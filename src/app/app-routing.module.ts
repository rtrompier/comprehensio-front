import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CareGiverGuard } from './caregiver/caregiver.guard';
import { InterpreterGuard } from './interpreter/interpreter.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: './default/default.module#DefaultPageModule'
  },
  {
    path: 'caregiver',
    canActivate: [CareGiverGuard],
    loadChildren: './caregiver/caregiver.module#CaregiverPageModule'
  },
  {
    path: 'interpreter',
    canActivate: [InterpreterGuard],
    loadChildren: './interpreter/interpreter.module#InterpreterPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
