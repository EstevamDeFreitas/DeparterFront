import { SharedModule } from './../shared/shared.module';
import { HorasRoutingModule } from './horas-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasUsuarioComponent } from './components/horas-usuario/horas-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    HorasUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HorasRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class HorasModule { }
