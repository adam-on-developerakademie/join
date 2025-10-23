import { Routes } from '@angular/router';
import{CRUD} from './crud/crud';
export const routes: Routes = [
    { path: '', component: CRUD },
    { path: 'CRUD', component: CRUD },
    { path: 'crud', component: CRUD },
];
