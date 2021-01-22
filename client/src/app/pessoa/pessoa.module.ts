import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { PessoaMessageService } from './messages/pessoa.message.service';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaComponent } from './pessoa.component';
import { PessoaService } from './pessoa.service';

@NgModule({
  declarations: [PessoaComponent, PessoaListComponent, PessoaFormComponent],
  imports: [CommonModule, AngularMaterialModule, PessoaRoutingModule],
  exports: [PessoaListComponent, PessoaFormComponent],
  providers: [PessoaService, PessoaMessageService],
})
export class PessoaModule {}
