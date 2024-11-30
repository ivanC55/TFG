import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantesPublicComponent } from './restaurantes-public.component';

describe('RestaurantesPublicComponent', () => {
  let component: RestaurantesPublicComponent;
  let fixture: ComponentFixture<RestaurantesPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantesPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantesPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
