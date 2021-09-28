export class Course {
  public id: number;
  public name: string;
  public description: string;
  public rating: number;
  public price: number;
  public categoryId: number;
  public imageUrl: string;
  public instructor: string;
  public productdetail: any[];
  constructor(
    id: number,
    name: string,
    description: string,
    rating: number,
    price: number,
    categoryId: number,
    imageUrl: string,
    instructor: string,
    productdetail: any[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.price = price;
    this.categoryId = categoryId;
    this.imageUrl = imageUrl;
    this.instructor = instructor;
    this.productdetail = productdetail;
  }
}
