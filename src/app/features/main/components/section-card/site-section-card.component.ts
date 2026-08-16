import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-site-section-card',  
  templateUrl: './site-section-card.component.html',
  styleUrl: './site-section-card.component.css',  
})
export class SiteSectionCard {

  @Input({ required: true })
  title!: string;

  @Input()
  description = '';

  @Input({ required: true })
  image!: string;

  @Input()
  icon = 'pi-image';

  @Output()
  selected = new EventEmitter<void>();

  onClick(): void {
    this.selected.emit();
  }
}