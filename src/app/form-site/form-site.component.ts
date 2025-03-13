import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-form-site',
  imports: [],
  templateUrl: './form-site.component.html',
  styleUrl: './form-site.component.css'
})
export class FormSiteComponent {

  constructor(private el: ElementRef) {}
  
  scrollIntoView() {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
