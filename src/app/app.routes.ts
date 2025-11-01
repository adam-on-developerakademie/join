import { Routes } from '@angular/router';
import { CRUD } from './crud/crud';
import { AddContactComponent } from './contacts/add-contact/add-contact';
import { Contacts } from './contacts/contacts';
import { OverlayAddContactComponent } from './contacts/overlay-add-contact/overlay-add-contact';

export const routes: Routes = [
     { path: '', component: Contacts },
  { path: 'summary', redirectTo: '', pathMatch: 'full' },
  { path: 'contacts', component: Contacts },
  { path: 'addc', component: OverlayAddContactComponent },
  { path: 'CRUD', component: CRUD },
  { path: 'crud', component: CRUD },
 // { path: 'addc', component: AddContactComponent },


];
