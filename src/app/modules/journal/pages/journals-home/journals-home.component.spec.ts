import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalsHomeComponent } from './journals-home.component';

describe('JournalsHomeComponent', () => {
  let component: JournalsHomeComponent;
  let fixture: ComponentFixture<JournalsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
