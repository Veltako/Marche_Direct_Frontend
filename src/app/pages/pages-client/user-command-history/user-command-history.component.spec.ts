import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommandHistoryComponent } from './user-command-history.component';

describe('UserCommandHistoryComponent', () => {
  let component: UserCommandHistoryComponent;
  let fixture: ComponentFixture<UserCommandHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCommandHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCommandHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
