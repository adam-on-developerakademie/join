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
  contactsGroups: string[] = [];
  myData;
  data: any[] = [];


  constructor() {
    this.contact = {} as IContact;
    this.contactsArray = [];

    this.myContacts = onSnapshot(this.contactsCollectionSorted, (snapshot) => {
      this.contactsArray = [];
      this.contactsGroups = [];
      snapshot.forEach((element) => {
        this.contactsArray.push({ id: element.id, ...element.data() } as IContact);
        this.contactsGroups.push(element.data()['name'].charAt(0).toUpperCase());
        this.contactsGroups = Array.from(new Set(this.contactsGroups)).sort();
        console.log(this.contactsArray, this.contactsGroups);
      });
      this.saveToLocalStorage()
    });

    this.myData = onSnapshot(this.dataCollection, (snapshot) => {
      this.data = snapshot.docs.map((doc) => doc.data());
      console.log(this.data);
    });

    
  }


  setAddContact(name: string, surname: string, email: string, phone: string) {
    this.contact = {
      name: name,
      surname: surname,
      email: email,
      phone: phone
    };
    console.log(this.contact);
    this.addContact(this.contact);
  }

  async addContact(contact: IContact) {
    await addDoc(this.contactsCollection, { date: new Date(), color: this.getRandomColor(), ...contact });
  }

  async updateContact(id: number, contact: IContact) {
    await updateDoc(doc(this.contactsCollection, this.contactsArray[id].id), { ...contact });
  }

  async delContact(id: number) {
    //this.contactsArray.splice(id, 1);
    this.contactsArray.length >= 0 ? await deleteDoc(doc(this.contactsCollection, this.contactsArray[id].id)) : null;
  }


  onDestroy() {
    this.myContacts();
    this.myData();
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 222);
    const g = Math.floor(Math.random() * 222);
    const b = Math.floor(Math.random() * 222);

    const toHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    const color = `#${toHex(r)}${toHex(g)}${toHex(b)}`
    return color;
  }

  saveToLocalStorage() {
    localStorage.setItem('JoinFirebase', JSON.stringify(this.contactsArray));
  }

}