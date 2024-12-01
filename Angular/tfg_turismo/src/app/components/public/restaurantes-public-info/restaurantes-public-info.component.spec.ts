import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantesPublicInfoComponent } from './restaurantes-public-info.component';

describe('RestaurantesPublicInfoComponent', () => {
  let component: RestaurantesPublicInfoComponent;
  let fixture: ComponentFixture<RestaurantesPublicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantesPublicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantesPublicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
