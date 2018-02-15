import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObraComponent } from './edit-obra.component';

describe('EditObraComponent', () => {
  let component: EditObraComponent;
  let fixture: ComponentFixture<EditObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
