import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrincipalComponent } from './components/principal/principal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [];

@NgModule({
    declarations: [
    PrincipalComponent,
    NavBarComponent
  ],
    imports: [
      RouterModule.forChild(routes),
      MatIconModule
    ],
    exports: [
     PrincipalComponent,
     CommonModule,
     NavBarComponent,
     MatIconModule
    ],
    entryComponents: [
      
    ]
  })
  export class SharedModule { }
  