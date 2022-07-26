import {AbstractFirestoreDocument} from "./AbstractFirestoreDocument";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";


export abstract class AbstractFirestoreDocumentRepository<T extends AbstractFirestoreDocument> {

  private documentCollectionReference: AngularFirestoreCollection<T>;

  private readonly $documentCollection: Observable<T[]>;

  private readonly collectionName: string;

  private _activeDocument: T | undefined;
  private _activeDocumentReference: AngularFirestoreDocument<T> | undefined;

  protected constructor(collectionName: string, private afs: AngularFirestore) {
    this.documentCollectionReference = afs.collection<T>(collectionName);
    this.$documentCollection = this.documentCollectionReference.valueChanges();
    this.collectionName = collectionName;
    this._activeDocument = undefined;
    this._activeDocumentReference = undefined;
  }

  getDocumentById(id: string): Observable<T | undefined> {
    return this.afs.doc<T>(this.collectionName + '/' + id).valueChanges();
  }

  getCollection(): Observable<T[]> {
    return this.$documentCollection;
  }

  get activeDocument(): T | undefined {
    return this._activeDocument;
  }

  set activeDocument(document: T | undefined) {
    this._activeDocument = document;
    this._activeDocumentReference = this.afs.doc<T>(this.collectionName + '/' + document?.id);
  }

  updateActiveDocument(document: T | undefined) {
    if (document) {
      this._activeDocumentReference?.update(document).then(() => {
        this.activeDocument = document;
      })
    }
  }

  getActiveDocumentById(id: string | null): T | undefined{

    if(id) {
      this.getDocumentById(id).subscribe((document: T | undefined) => {
        this.activeDocument = document;
      });
    }
    return this.activeDocument;
  }

}
