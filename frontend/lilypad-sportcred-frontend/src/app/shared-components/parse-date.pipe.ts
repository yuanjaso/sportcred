import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate',
})
export class ParseDatePipe implements PipeTransform {
  transform(date: string, ...args: unknown[]): unknown {
    let split = date.indexOf('T');
    let day = date.slice(0, split);
    let time = date.slice(split + 1, date.indexOf('.'));

    return `${day}&nbsp;&nbsp;&nbsp;${time}`;
  }
}
