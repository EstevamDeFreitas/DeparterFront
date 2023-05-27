import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoHorasComponent } from './configuracao-horas.component';

describe('ConfiguracaoHorasComponent', () => {
  let component: ConfiguracaoHorasComponent;
  let fixture: ComponentFixture<ConfiguracaoHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracaoHorasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
