import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasUsuarioComponent } from './horas-usuario.component';

describe('HorasUsuarioComponent', () => {
  let component: HorasUsuarioComponent;
  let fixture: ComponentFixture<HorasUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorasUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
