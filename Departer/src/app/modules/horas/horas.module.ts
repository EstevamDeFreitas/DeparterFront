import { HorasRoutingModule } from './horas-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasUsuarioComponent } from './components/horas-usuario/horas-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HorasUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HorasRoutingModule
  ]
})
export class HorasModule { }
