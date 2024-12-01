import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonumentosPublicInfoComponent } from './monumentos-public-info.component';

describe('MonumentosPublicInfoComponent', () => {
  let component: MonumentosPublicInfoComponent;
  let fixture: ComponentFixture<MonumentosPublicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonumentosPublicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonumentosPublicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
