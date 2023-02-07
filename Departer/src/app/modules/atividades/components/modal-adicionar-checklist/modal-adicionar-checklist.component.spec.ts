import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarChecklistComponent } from './modal-adicionar-checklist.component';

describe('ModalAdicionarChecklistComponent', () => {
  let component: ModalAdicionarChecklistComponent;
  let fixture: ComponentFixture<ModalAdicionarChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionarChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdicionarChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
