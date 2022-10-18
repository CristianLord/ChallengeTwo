import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFindComponent } from './subscription-find.component';

describe('SubscriptionFindComponent', () => {
  let component: SubscriptionFindComponent;
  let fixture: ComponentFixture<SubscriptionFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionFindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
