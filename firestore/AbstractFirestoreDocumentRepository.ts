import { AbstractFirestoreDocument } from "./AbstractFirestoreDocument";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { BehaviorSubject, Observable } from "rxjs";

export abstract class AbstractFirestoreDocumentRepository<
  T extends AbstractFirestoreDocument
> {
  private documentCollectionReference: AngularFirestoreCollection<T>;

  private readonly documentCollection$: Observable<T[]>;

  private readonly collectionName: string;

  private activeDocument$: BehaviorSubject<T | undefined>;
  private _activeDocumentReference: AngularFirestoreDocument<T> | undefined;

  protected constructor(collectionName: string, private afs: AngularFirestore) {
    this.documentCollectionReference = afs.collection<T>(collectionName);
    this.documentCollection$ = this.documentCollectionReference.valueChanges();
    this.collectionName = collectionName;
    this.activeDocument$ = new BehaviorSubject<T | undefined>(undefined);
    this._activeDocumentReference = undefined;
  }

  getDocumentById(id: string): Observable<T | undefined> {
    return this.afs.doc<T>(this.collectionName + "/" + id).valueChanges();
  }

  getCollection(): Observable<T[]> {
    return this.documentCollection$;
  }

  getActiveDocumentSubscription(): BehaviorSubject<T | undefined> {
    return this.activeDocument$;
  }

  getCollectionReference(): AngularFirestoreCollection<T> {
    return this.documentCollectionReference;
  }

  setActiveDocument(document: T): void {
    this.activeDocument$.next(document);
  }

  updateActiveDocument(document: T | undefined) {
    if (document) {
      this._activeDocumentReference = this.afs.doc<T>(
        this.collectionName + "/" + document.id
      );
      this._activeDocumentReference?.update(document).then(() => {
        this.setActiveDocument(document);
      });
    }
  }

  setActiveDocumentById(id: string | null): void {
    if (id) {
      this.getDocumentById(id).subscribe((document: T | undefined) => {
        this.updateActiveDocument(document);
      });
    }
  }

  setAndGetActiveDocument(document: T): BehaviorSubject<T | undefined> {
    this.setActiveDocument(document);
    return this.getActiveDocumentSubscription();
  }

  abstract insertDocument(document: T): Promise<void>;
}
