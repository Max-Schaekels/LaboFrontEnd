import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'europeanDate'
})
export class EuropeanDatePipe implements PipeTransform {

  transform(value: string | Date): string {
    const date = new Date(value);
    const pad = (n: number) => n.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

}
