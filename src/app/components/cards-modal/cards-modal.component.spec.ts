import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsModalComponent } from './cards-modal.component';

describe('CardsModalComponent', () => {
  let component: CardsModalComponent;
  let fixture: ComponentFixture<CardsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
