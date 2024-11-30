import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosInteresPublicComponent } from './puntos-interes-public.component';

describe('PuntosInteresPublicComponent', () => {
  let component: PuntosInteresPublicComponent;
  let fixture: ComponentFixture<PuntosInteresPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PuntosInteresPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuntosInteresPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
