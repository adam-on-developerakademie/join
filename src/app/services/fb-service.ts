import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FbService {
  public db = inject(Firestore);

  contactsCollection = collection(this.db, 'contacts');
  dataCollection = collection(this.db, 'data');

  myContacts;
  contacts: any[] = [];
  myData;
  data: any[] = [];
  constructor() {

    this.myContacts = onSnapshot(this.contactsCollection, (snapshot) => {
      this.contacts = snapshot.docs.map((doc) => doc.data());
      console.log(this.contacts);
    });

    this.myData = onSnapshot(this.dataCollection, (snapshot) => {
      this.data = snapshot.docs.map((doc) => doc.data());
      console.log(this.data);
    });
  }

}