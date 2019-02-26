export class Product {

  public id: number;
  public title: string;
  public description: string;
  public images: string[];
  public price: number;

  constructor(title: string, description: string, images: string[], price: number, id?: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.images = images;
    this.price = <number><unknown>(price.toFixed(2));
  }
}
