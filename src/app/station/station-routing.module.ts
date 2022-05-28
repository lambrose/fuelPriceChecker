import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationComponent } from './station.component';

const routes: Routes = [
  {
    path: 'station',
    component: StationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationRoutingModule {}
