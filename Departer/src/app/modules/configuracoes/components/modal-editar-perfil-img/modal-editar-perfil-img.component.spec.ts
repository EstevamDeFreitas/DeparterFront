import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarPerfilImgComponent } from './modal-editar-perfil-img.component';

describe('ModalEditarPerfilImgComponent', () => {
  let component: ModalEditarPerfilImgComponent;
  let fixture: ComponentFixture<ModalEditarPerfilImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarPerfilImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarPerfilImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
