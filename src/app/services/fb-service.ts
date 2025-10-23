import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { IContact } from '../interfaces/i-contact';

@Injectable({
  providedIn: 'root'
})
export class FbService {
  public db = inject(Firestore);

  contact: IContact;
  contactsCollectionSorted = query(collection(this.db, 'contacts'), orderBy('date', 'desc'));
  contactsCollection = collection(this.db, 'contacts');
  dataCollection = collection(this.db, 'data');

  myContacts;
  contactsArray: IContact[] = [];
  myData;
  data: any[] = [];
  constructor() {
    this.contact = {} as IContact;

    this.myContacts = onSnapshot(this.contactsCollectionSorted, (snapshot) => {
      this.contactsArray = [];
      snapshot.forEach((element) => {
        this.contactsArray.push({ id: element.id, ...element.data() } as IContact);
        console.log(this.contactsArray);
      });
    });

    this.myData = onSnapshot(this.dataCollection, (snapshot) => {
      this.data = snapshot.docs.map((doc) => doc.data());
      console.log(this.data);
    });

  }


  setAddContact(name: string, surname: string, email: string) {
    this.contact = {
      name: name,
      surname: surname,
      email: email
    };
    console.log(this.contact);
    this.addContact(this.contact);
  }

  async addContact(contact: IContact) {
    await addDoc(this.contactsCollection, { date: new Date(), ...contact });
  }

  async updateContact(id: number, contact: IContact) {
    await updateDoc(doc(this.contactsCollection, this.contactsArray[id].id), { ...contact });
  }

  async delContact(id: number) {
    await deleteDoc(doc(this.contactsCollection, this.contactsArray[id].id));
  }


  onDestroy() {
    this.myContacts();
    this.myData();
  }


}