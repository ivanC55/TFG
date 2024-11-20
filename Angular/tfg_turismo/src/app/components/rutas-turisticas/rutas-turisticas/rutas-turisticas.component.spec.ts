import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasTuristicasComponent } from './rutas-turisticas.component';

describe('RutasTuristicasComponent', () => {
  let component: RutasTuristicasComponent;
  let fixture: ComponentFixture<RutasTuristicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RutasTuristicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutasTuristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
