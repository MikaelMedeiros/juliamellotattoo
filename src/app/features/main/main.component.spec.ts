import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ImageExtensionService } from '../../shared/image-extension.service';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        {
          provide: ImageExtensionService,
          useValue: {
            findImageUrl: (path: string) => of(`${path}.png`)
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resolves section image extensions in the admin cards', () => {
    expect(component.sections.every(section => section.image.endsWith('.png')))
      .toBeTrue();
  });
});
