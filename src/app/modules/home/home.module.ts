import { SharedModule } from './../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxMaskModule, IConfig }  from  'ngx-mask';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule
  ]
})
export class HomeModule { }
