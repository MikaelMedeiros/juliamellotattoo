import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingSiteComponent } from './painting-site.component';

describe('PaintingSiteComponent', () => {
  let component: PaintingSiteComponent;
  let fixture: ComponentFixture<PaintingSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintingSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintingSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
