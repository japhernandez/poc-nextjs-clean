import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mylist',
    loadChildren: () =>
      import('./mylist/mylist.module').then((m) => m.MylistModule),
  },
];
