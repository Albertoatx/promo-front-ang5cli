import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePromoComponent } from './delete-promo.component';

describe('DeletePromoComponent', () => {
  let component: DeletePromoComponent;
  let fixture: ComponentFixture<DeletePromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
