import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string, format: string = 'DD/MM/YYYY HH:mm:ss a'): string {
    return moment(value).format(format);
  }

}
