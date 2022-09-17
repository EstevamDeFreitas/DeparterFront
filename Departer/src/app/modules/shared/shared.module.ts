import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [];

@NgModule({
    declarations: [
    PrincipalComponent
  ],
    imports: [
      RouterModule.forChild(routes),
     
    ],
    exports: [
     PrincipalComponent,
     CommonModule
    ],
    entryComponents: [
      
    ]
  })
  export class SharedModule { }
  