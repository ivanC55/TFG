import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasPublicComponent } from './rutas-public.component';

describe('RutasPublicComponent', () => {
  let component: RutasPublicComponent;
  let fixture: ComponentFixture<RutasPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RutasPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutasPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
