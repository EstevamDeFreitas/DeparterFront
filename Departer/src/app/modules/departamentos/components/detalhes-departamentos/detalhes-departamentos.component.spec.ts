import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDepartamentosComponent } from './detalhes-departamentos.component';

describe('DetalhesDepartamentosComponent', () => {
  let component: DetalhesDepartamentosComponent;
  let fixture: ComponentFixture<DetalhesDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesDepartamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
