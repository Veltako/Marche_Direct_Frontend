import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return 'Date non disponible';

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Date invalide';
    }

    return formatDate(date, 'dd MMMM yyyy à HH:mm', 'fr-FR');
  }

}
