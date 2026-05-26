import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pong } from './pong';

describe('Pong', () => {
  let component: Pong;
  let fixture: ComponentFixture<Pong>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pong],
    }).compileComponents();

    fixture = TestBed.createComponent(Pong);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
