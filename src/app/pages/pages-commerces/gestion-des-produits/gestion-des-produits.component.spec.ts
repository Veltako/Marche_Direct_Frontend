import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesProduitsComponent } from './gestion-des-produits.component';

describe('GestionDesProduitsComponent', () => {
  let component: GestionDesProduitsComponent;
  let fixture: ComponentFixture<GestionDesProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDesProduitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDesProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
