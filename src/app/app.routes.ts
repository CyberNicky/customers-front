import { Routes } from '@angular/router';
import { RegisterNewCustomersComponent } from './components/register-new-customers/register-new-customers.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TableCustomersComponent } from './components/table-customers/table-customers.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'registro-de-clientes',
    component: RegisterNewCustomersComponent,
  },
  {
    path: 'clientes',
    component: TableCustomersComponent,
  },
  {
    path: 'clientes/:name',
    component: TableCustomersComponent,
  },
  {
    path: 'registro-de-clientes/:id',
    component: RegisterNewCustomersComponent,
  },
  //   {
  //     path: 'sobre',
  //     component: AboutComponent,
  //   },
];
