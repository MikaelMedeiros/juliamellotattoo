import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsSiteComponent } from './tips-site.component';

describe('TipsSiteComponent', () => {
  let component: TipsSiteComponent;
  let fixture: ComponentFixture<TipsSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
