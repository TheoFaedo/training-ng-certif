import { Directive } from '@angular/core';

@Directive({
  selector: '[card-title]',
  host: {
    '[id]': 'id',
  },
})
export class CardTitle {
  id = 'ui-card-title-' + crypto.randomUUID();
}
