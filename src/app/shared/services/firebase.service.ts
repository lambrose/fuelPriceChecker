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

  create(location: string, station: IStationPrice): any {
    return this.afs.collection(location).add(station);
  }

  getAll(location: string): Observable<any[]> {
    return this.afs.collection(location).snapshotChanges();
  }

  update(location: string, id: string, station: IStationPrice): Promise<void> {
    return this.afs.collection(location).doc(id).set(station);
    // return this.afs.collection(location).doc(id).update(data);
  }

  // delete(id: string): Promise<void> {
  //   return this.stationRef.doc(id).delete();
  // }
}
