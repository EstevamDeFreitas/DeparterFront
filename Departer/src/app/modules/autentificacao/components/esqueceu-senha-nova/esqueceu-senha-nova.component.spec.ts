import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueceuSenhaNovaComponent } from './esqueceu-senha-nova.component';

describe('EsqueceuSenhaNovaComponent', () => {
  let component: EsqueceuSenhaNovaComponent;
  let fixture: ComponentFixture<EsqueceuSenhaNovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsqueceuSenhaNovaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsqueceuSenhaNovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
