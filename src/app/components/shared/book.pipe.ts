import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookFilter'
})
export class BookPipe implements PipeTransform {

  transform(value: any, searchTerm: string = '') {
    if (searchTerm !== '') {
      const result = value.filter((book) => book.title.toLowerCase().includes(searchTerm));
      return result;
    } else {
      return value;
    }
  }

}
