export class Product {

  private _id: number;
  private _title: string;
  private _description: string;
  private _images: string[];
  private _price: number;

  constructor(id: number, title: string, description: string, images: string[], price: number) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._images = images;
    this._price = price;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get images(): string[] {
    return this._images;
  }

  set imagePath(value: string[]) {
    this._images = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
}
