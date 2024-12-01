import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosInteresPublicInfoComponent } from './puntos-interes-public-info.component';

describe('PuntosInteresPublicInfoComponent', () => {
  let component: PuntosInteresPublicInfoComponent;
  let fixture: ComponentFixture<PuntosInteresPublicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PuntosInteresPublicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuntosInteresPublicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
