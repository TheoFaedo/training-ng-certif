import { Component, computed, contentChild, effect, ElementRef } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-ui-card',
  styleUrl: './ui-card.less',
  templateUrl: './ui-card.html',
})
export class UiCard {
  contentTitle = contentChild<ElementRef<HTMLHtmlElement>>('[card-title]');

  titleId = computed(() => this.contentTitle()?.nativeElement.id);

  constructor() {
    effect(() => {
      this.contentTitle()?.nativeElement.setAttribute('title', '');
    });
  }
}
