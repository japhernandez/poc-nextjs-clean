import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MylistComponent } from './mylist.component';

const routes: Routes = [
  {
    path: '',
    component: MylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MylistRoutingModule { }
