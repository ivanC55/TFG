import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosPublicInfoComponent } from './eventos-public-info.component';

describe('EventosPublicInfoComponent', () => {
  let component: EventosPublicInfoComponent;
  let fixture: ComponentFixture<EventosPublicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventosPublicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventosPublicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
