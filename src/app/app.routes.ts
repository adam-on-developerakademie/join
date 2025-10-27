import { Routes } from '@angular/router';
import{CRUD} from './crud/crud';
import { AddContactComponent } from './add-contact/add-contact';
import { OverlayEditContactComponent } from './contacts/overlay-edit-contact/overlay-edit-contact';
import { OverlayEditContact2Component } from './contacts/overlay-edit-contact-2/overlay-edit-contact-2';
import { ContactOptionsComponent } from './contacts/contact-options/contact-options';
import { ContactSuccessToastComponent } from './contacts/contact-success-toast/contact-success-toast';

export const routes: Routes = [
  //  { path: '', component: CRUD },
    { path: 'CRUD', component: CRUD },
    { path: 'crud', component: CRUD },
    { path: 'addc', component: AddContactComponent },
      { path: 'contacts/edit', component: OverlayEditContactComponent },
  { path: 'contacts/edit-2', component: OverlayEditContact2Component },
  { path: 'contacts/options', component: ContactOptionsComponent },
  { path: 'contacts/success', component: ContactSuccessToastComponent },

];
