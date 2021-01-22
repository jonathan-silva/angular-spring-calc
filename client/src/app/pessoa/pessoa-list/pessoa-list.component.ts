import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { coreAnimations } from '../../shared/animations';
import { PessoaMessageService } from '../messages/pessoa.message.service';
import { Pessoa } from '../pessoa.model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: coreAnimations,
})
export class PessoaListComponent implements OnInit {
  private readonly _unsubscribeAll: Subject<any>;
  pessoas: Pessoa[] = [];
  msgListaVaziaPessoa: string = 'Não foi encontrado nenhum registro.';
  displayedColumns = ['id', 'nm_pessoa', 'buttons'];

  constructor(
    private readonly _pessoaService: PessoaService,
    private readonly _pessoaMessageService: PessoaMessageService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.onChangePessoa();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * @description Busca pessoas no datasource da service
   * @returns {void} void
   */
  onChangePessoa(): void {
    this._pessoaService.onPessoaChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        this.pessoas = response;
        if (this.pessoas.length !== 0) {
          this.checkList(response);
        }
      });
  }

  /**
   * @description Checa o retorno do backend, e cria datasource
   * @param pessoaList
   * @returns {Pessoa[]} Pessoa[]
   */
  checkList(pessoaList: any): Pessoa[] {
    if (!pessoaList.length) {
      pessoaList = [pessoaList];
    }
    this.pessoas = pessoaList.map((pessoa) => {
      return new Pessoa(pessoa);
    });
    return this.pessoas;
  }

  /**
   * @description Condicional para deletar pessoa
   * @param pessoa
   * @returns {void} void
   */
  excluirPessoa(pessoa: Pessoa): void {
    this._pessoaMessageService
      .pessoaDelete(`Deseja realmente excluir ${pessoa.nm_pessoa} ?`)
      .then((data) => {
        if (data) {
          this._pessoaService.deletePessoa(pessoa);
        }
      });
  }
}
