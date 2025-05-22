import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMarcheComponent } from './page-marche.component';

describe('PageMarcheComponent', () => {
  let component: PageMarcheComponent;
  let fixture: ComponentFixture<PageMarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMarcheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
