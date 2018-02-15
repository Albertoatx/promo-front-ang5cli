import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromoComponent } from './view-promo.component';

describe('ViewPromoComponent', () => {
  let component: ViewPromoComponent;
  let fixture: ComponentFixture<ViewPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
