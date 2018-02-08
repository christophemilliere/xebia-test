export class Book {
  title: string;
  isbn: string;
  price: number;
  synopsis: object;
  cover: string;
  constructor(title: string, isbn: string, price: number, synopsis: object, cover: string) {
    this.title = title;
    this.isbn = isbn;
    this.price = price;
    this.synopsis = synopsis;
    this.cover = cover;
  }
}
