import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlojamientosPublicComponent } from './alojamientos-public.component';

describe('AlojamientosPublicComponent', () => {
  let component: AlojamientosPublicComponent;
  let fixture: ComponentFixture<AlojamientosPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlojamientosPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlojamientosPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
