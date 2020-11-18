import { Pipe, PipeTransform } from '@angular/core';

// remember to add encapsulation: ViewEncapsulation.None to enable styling

@Pipe({
  name: 'urlify',
})
export class UrlifyPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    return value.replace(urlRegex, function (url) {
      return '<a target = "_blank" href="' + url + '">' + url + '</a>';
    });
  }
}
