import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaComponent } from './pessoa.component';
import { PessoaService } from './pessoa.service';

const routes: Routes = [
  {
    path: '',
    component: PessoaComponent,
    resolve: {
      pessoa: PessoaService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaRoutingModule {}
