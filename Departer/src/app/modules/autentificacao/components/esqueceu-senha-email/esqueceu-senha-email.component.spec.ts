import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueceuSenhaEmailComponent } from './esqueceu-senha-email.component';

describe('EsqueceuSenhaEmailComponent', () => {
  let component: EsqueceuSenhaEmailComponent;
  let fixture: ComponentFixture<EsqueceuSenhaEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsqueceuSenhaEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsqueceuSenhaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
