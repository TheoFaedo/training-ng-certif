import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceFormatter',
})
export class DistanceFormatterPipe implements PipeTransform {
  transform(value: number): number {
    return Number((value / 1000).toFixed(1));
  }
}
