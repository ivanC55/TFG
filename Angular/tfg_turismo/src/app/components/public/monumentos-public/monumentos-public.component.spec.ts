import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonumentosPublicComponent } from './monumentos-public.component';

describe('MonumentosPublicComponent', () => {
  let component: MonumentosPublicComponent;
  let fixture: ComponentFixture<MonumentosPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonumentosPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonumentosPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
