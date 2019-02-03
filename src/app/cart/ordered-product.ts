export class OrderedProduct {

  public product_id: number;
  public title: string;
  public image: string;
  public price: number;
  public amount: number;

  constructor(product_id: number, title: string, image: string, price: number, amount: number) {
    this.product_id = product_id;
    this.title = title;
    this.image = image;
    this.price = price;
    this.amount = amount;
  }
}
