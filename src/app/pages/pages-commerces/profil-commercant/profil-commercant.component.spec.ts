import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilCommercantComponent } from './profil-commercant.component';

describe('ProfilCommercantComponent', () => {
  let component: ProfilCommercantComponent;
  let fixture: ComponentFixture<ProfilCommercantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilCommercantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilCommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
