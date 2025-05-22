import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantComponent } from './marchant.component';

describe('MarchantComponent', () => {
  let component: MarchantComponent;
  let fixture: ComponentFixture<MarchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarchantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
