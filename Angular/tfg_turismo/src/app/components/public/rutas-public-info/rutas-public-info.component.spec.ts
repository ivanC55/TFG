import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasPublicInfoComponent } from './rutas-public-info.component';

describe('RutasPublicInfoComponent', () => {
  let component: RutasPublicInfoComponent;
  let fixture: ComponentFixture<RutasPublicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RutasPublicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutasPublicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
