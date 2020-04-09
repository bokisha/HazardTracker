import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { VisitorsListComponent } from './visitors-list/visitors-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/generate-code',
    pathMatch: 'full'
  },
  { path: 'generate-code', component: GenerateCodeComponent },
  { path: 'visitors-list', component: VisitorsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
