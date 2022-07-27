import { AbstractFirestoreDocument } from './AbstractFirestoreDocument';
import { AbstractFirestoreDocumentRepository } from './AbstractFirestoreDocumentRepository';
import { Subscription } from 'rxjs';

export abstract class AbstractFirestoreSmartComponent<T extends AbstractFirestoreDocument> {
  public document: T | undefined;
  private documentSubscription$: Subscription | undefined;

  constructor(private documentRepository: AbstractFirestoreDocumentRepository<T>) {}

  setupSubscriptionWithDocument(document: T) {
    this.documentSubscription$ = this.documentRepository
      .setAndGetActiveDocument(document)
      .subscribe((document) => {
        this.document = document;
      });
  }

  setupSubscriptionToActiveDocument() {
    this.documentSubscription$ = this.documentRepository.getActiveDocumentSubscription().subscribe(document => {
        this.document = document;
    })
  }

  destroySubscription() {
    if (this.documentSubscription$) {
      this.documentSubscription$.unsubscribe();
    }
  }
}
