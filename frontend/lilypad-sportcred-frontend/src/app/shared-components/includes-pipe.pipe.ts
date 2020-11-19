import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includesPipe',
})
export class IncludesPipePipe implements PipeTransform {
  transform(compared: string, to: string): boolean {
    return compared?.includes(to);
  }
}
