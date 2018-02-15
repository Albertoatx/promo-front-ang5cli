import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObrasComponent } from './list-obras.component';

describe('ListObrasComponent', () => {
  let component: ListObrasComponent;
  let fixture: ComponentFixture<ListObrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListObrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
