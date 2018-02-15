import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotoresComponent } from './promotores.component';

describe('PromotoresComponent', () => {
  let component: PromotoresComponent;
  let fixture: ComponentFixture<PromotoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
