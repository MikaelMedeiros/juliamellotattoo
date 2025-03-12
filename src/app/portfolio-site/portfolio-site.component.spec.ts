import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSiteComponent } from './portfolio-site.component';

describe('PortfolioSiteComponent', () => {
  let component: PortfolioSiteComponent;
  let fixture: ComponentFixture<PortfolioSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
