import { Routes } from '@angular/router';
import { CRUD } from './crud/crud';
import { TestEditContactComponent } from './test-edit-contact/test-edit-contact'; 

export const routes: Routes = [
  //  { path: '', component: CRUD },
    { path: 'CRUD', component: CRUD },
    { path: 'crud', component: CRUD },
    { path: 'test-edit-contact', component: TestEditContactComponent }, 
];
