import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSiteComponent } from './banner-site.component';

describe('BannerSiteComponent', () => {
  let component: BannerSiteComponent;
  let fixture: ComponentFixture<BannerSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
