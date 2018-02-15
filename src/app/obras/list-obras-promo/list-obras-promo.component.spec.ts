import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObrasPromoComponent } from './list-obras-promo.component';

describe('ListObrasPromoComponent', () => {
  let component: ListObrasPromoComponent;
  let fixture: ComponentFixture<ListObrasPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListObrasPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListObrasPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
