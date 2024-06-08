import { Routes } from '@angular/router';
import { RegisterNewCustomersComponent } from './components/register-new-customers/register-new-customers.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TableCustomersComponent } from './components/table-customers/table-customers.component';
import { EditCustomersComponent } from './components/edit-customers/edit-customers.component';

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
    path: 'editar-cadastro',
    component: EditCustomersComponent,
  },
  //   {
  //     path: 'sobre',
  //     component: AboutComponent,
  //   },
];
