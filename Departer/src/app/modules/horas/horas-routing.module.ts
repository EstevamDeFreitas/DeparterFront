
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HorasUsuarioComponent } from "./components/horas-usuario/horas-usuario.component";

const routes: Routes = [
    {path:'', component: HorasUsuarioComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class HorasRoutingModule { }