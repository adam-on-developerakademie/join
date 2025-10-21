import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from './environments/environment';

bootstrapApplication(App, {
  providers: [
    provideFirestore(() => getFirestore()),
    ...appConfig.providers,
  ],
}).catch(err => console.error(err));
