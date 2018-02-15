import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewObraComponent } from './view-obra.component';

describe('ViewObraComponent', () => {
  let component: ViewObraComponent;
  let fixture: ComponentFixture<ViewObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
