import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDepartamentosComponent } from './tela-departamentos.component';

describe('TelaDepartamentosComponent', () => {
  let component: TelaDepartamentosComponent;
  let fixture: ComponentFixture<TelaDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaDepartamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
