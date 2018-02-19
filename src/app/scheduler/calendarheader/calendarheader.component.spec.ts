import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarheaderComponent } from './calendarheader.component';

describe('CalendarheaderComponent', () => {
  let component: CalendarheaderComponent;
  let fixture: ComponentFixture<CalendarheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
