import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  Component,
  contentChild,
  input,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-widget-card',
  imports: [NgTemplateOutlet],
  templateUrl: './widget-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './widget-card.component.less',
})
export class WidgetCardComponent {
  errorTemplate = contentChild<TemplateRef<Component>>('errorTemplate');
  loadingTemplate = contentChild<TemplateRef<Component>>('loadingTemplate');

  isLoading = input(false, {
    transform: booleanAttribute,
  });

  isError = input(false, {
    transform: booleanAttribute,
  });
}
