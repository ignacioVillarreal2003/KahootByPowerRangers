import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotosJuegoComponent } from './votos-juego.component';

describe('VotosJuegoComponent', () => {
  let component: VotosJuegoComponent;
  let fixture: ComponentFixture<VotosJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotosJuegoComponent]
    });
    fixture = TestBed.createComponent(VotosJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
