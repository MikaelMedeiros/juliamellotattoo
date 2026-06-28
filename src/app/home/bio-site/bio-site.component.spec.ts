import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioSiteComponent } from './bio-site.component';

describe('BioSiteComponent', () => {
  let component: BioSiteComponent;
  let fixture: ComponentFixture<BioSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BioSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
