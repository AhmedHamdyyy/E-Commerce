import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onsale',
})
export class OnsalePipe implements PipeTransform {

  transform(title: string): string {
    return `on sale : ${title}`;
  }

}
