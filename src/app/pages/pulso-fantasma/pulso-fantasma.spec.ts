import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulsoFantasma } from './pulso-fantasma';

describe('PulsoFantasma', () => {
  let component: PulsoFantasma;
  let fixture: ComponentFixture<PulsoFantasma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PulsoFantasma],
    }).compileComponents();

    fixture = TestBed.createComponent(PulsoFantasma);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
