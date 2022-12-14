import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJournalComponent } from './view-journal.component';

describe('ViewJournalComponent', () => {
  let component: ViewJournalComponent;
  let fixture: ComponentFixture<ViewJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJournalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
