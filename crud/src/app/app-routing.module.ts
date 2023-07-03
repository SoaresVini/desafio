import { NgModule } from '@angular/core';
import { RouterModule, Routes } from
'@angular/router';
import { CadastroUserComponent } from './componentes/users/cadastro-user/cadastro-user.component';
import { ListarUserComponent } from './componentes/users/listar-user/listar-user.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'listarUsers',
    pathMatch: 'full'
  },
  {
    path: 'criarUsers',
    component: CadastroUserComponent
  },
  {
    path: 'listarUsers',
    component: ListarUserComponent
  },
  {
    path: 'criarUsers/:id',
    component: CadastroUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
