import { Routes } from '@angular/router';
import { CRUD } from './crud/crud';
import { AddContactComponent } from './contacts/add-contact/add-contact';

export const routes: Routes = [
  //  { path: '', component: CRUD },
  { path: 'CRUD', component: CRUD },
  { path: 'crud', component: CRUD },
  { path: 'addc', component: AddContactComponent },


];
