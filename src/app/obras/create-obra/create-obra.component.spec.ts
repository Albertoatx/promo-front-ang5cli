import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObraComponent } from './create-obra.component';

describe('CreateObraComponent', () => {
  let component: CreateObraComponent;
  let fixture: ComponentFixture<CreateObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
