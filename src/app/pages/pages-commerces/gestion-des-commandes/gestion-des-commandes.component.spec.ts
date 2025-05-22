import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesCommandesComponent } from './gestion-des-commandes.component';

describe('GestionDesCommandesComponent', () => {
  let component: GestionDesCommandesComponent;
  let fixture: ComponentFixture<GestionDesCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDesCommandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDesCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
