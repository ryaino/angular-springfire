export abstract class AbstractFirestoreDocument {

  private readonly _id: string;
  private readonly _collectionName: string;

  protected constructor(id: string, collectionName: string) {
    this._id = id;
    this._collectionName = collectionName;
  }

  public get id(): string {
    return this._id;
  }

  public get collectionName(): string {
    return this._collectionName;
  }
}
