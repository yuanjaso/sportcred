import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate',
})
export class ParseDatePipe implements PipeTransform {
  transform(date: string, ...args: unknown[]): string {
    const split = date.indexOf('T');
    const day = date.slice(0, split);
    const time = date.slice(split + 1, date.indexOf('.'));

    return `${day}&nbsp;&nbsp;&nbsp;${time}`;
  }
}
