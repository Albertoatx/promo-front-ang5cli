import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteObraComponent } from './delete-obra.component';

describe('DeleteObraComponent', () => {
  let component: DeleteObraComponent;
  let fixture: ComponentFixture<DeleteObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
