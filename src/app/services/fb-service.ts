import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FbService {
  public db = inject(Firestore);

  data;
  dataArray: any[] = [];
  testSammlung;
  testSammlungArray: any[] = [];
constructor() {

  this.testSammlung = onSnapshot(collection(this.db, 'testSammlung'), (snapshot) => {
    this.testSammlungArray = snapshot.docs.map((doc) => doc.data());
    console.log(this.testSammlungArray);
    
  });

    this.data = onSnapshot(collection(this.db, 'data'), (snapshot) => {
    this.dataArray = snapshot.docs.map((doc) => doc.data());
    console.log(this.dataArray);
  });
}

}