import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportResultPage } from './report-result.page';

const routes: Routes = [
  {
    path: '',
    component: ReportResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportResultPageRoutingModule {}
