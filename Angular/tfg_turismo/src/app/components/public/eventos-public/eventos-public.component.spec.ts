import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosPublicComponent } from './eventos-public.component';

describe('EventosPublicComponent', () => {
  let component: EventosPublicComponent;
  let fixture: ComponentFixture<EventosPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventosPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventosPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
