import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterditComponent } from './interdit.component';

describe('InterditComponent', () => {
  let component: InterditComponent;
  let fixture: ComponentFixture<InterditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
