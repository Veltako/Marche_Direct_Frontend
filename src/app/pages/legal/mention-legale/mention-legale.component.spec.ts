import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionLegaleComponent } from './mention-legale.component';

describe('MentionLegaleComponent', () => {
  let component: MentionLegaleComponent;
  let fixture: ComponentFixture<MentionLegaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentionLegaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentionLegaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
