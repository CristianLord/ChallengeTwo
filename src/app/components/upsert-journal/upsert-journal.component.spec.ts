import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertJournalComponent } from './upsert-journal.component';

describe('UpsertJournalComponent', () => {
  let component: UpsertJournalComponent;
  let fixture: ComponentFixture<UpsertJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertJournalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
