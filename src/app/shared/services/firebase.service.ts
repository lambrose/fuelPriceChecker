import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IStationPrice } from '../interfaces/station-price.interface';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private afsPath = '/station';
  stationRef!: AngularFirestoreCollection<IStationPrice>;

  constructor(private afs: AngularFirestore) {}

  // constructor(private afs: AngularFirestore) {
  //   this.stationRef = afs.collection(this.afsPath);
  // }

  isExist(location: string): any {
    return this.afs.collection(location).get();
  }

  create(location: string, station: IStationPrice): any {
    return this.afs.collection(location).add(station);
  }

  getAll(location: string): Observable<any[]> {
    return this.afs.collection(location).snapshotChanges();
  }

  update(id: string, data: any): Promise<void> {
    return this.stationRef.doc(id).update(data);
  }

  // delete(id: string): Promise<void> {
  //   return this.stationRef.doc(id).delete();
  // }
}
