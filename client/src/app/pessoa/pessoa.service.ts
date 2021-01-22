import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PessoaMessageService } from './messages/pessoa.message.service';
import { Pessoa } from './pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService implements Resolve<any> {
  private readonly _restService = `${environment.urlApi}/pessoa`;

  onPessoaChanged: BehaviorSubject<any>;
  pessoas: Pessoa[] = [];
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _messagePessoa: PessoaMessageService
  ) {
    this.onPessoaChanged = new BehaviorSubject([]);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getPessoas()]).then(([response]) => {
        resolve(response);
      }, reject);
    });
  }

  onChangePessoa(response: any): any {
    this.pessoas.push(response);
    this.onPessoaChanged.next(this.pessoas);
  }

  /**
   * @description Store Registro de Pessoa
   * @params {Pessoa} pessoa
   * @returns {Promise<any>}
   * @method POST
   */
  storePessoa(pessoa: any): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.post(`${this._restService}/create`, pessoa).subscribe(
        (data: Pessoa) => {
          this._messagePessoa.criadoPessoaSucesso(
            `Criado ${data.nm_pessoa} com sucesso!`
          );
          this.onChangePessoa(data);
          resolve(data);
        },
        (error: any) => {
          console.error(error);
          this._messagePessoa.pessoaErroGeneric();
        }
      );
    });
  }

  /**
   * @description Visualizar Pessoas
   * @method GET
   * @returns {Promise} Promise
   */
  getPessoas(): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient
        .get(`${this._restService}`)
        .subscribe((response: Pessoa[]) => {
          this.pessoas = response;
          this.onPessoaChanged.next(this.pessoas);
          resolve(response);
        });
    });
  }

  /**
   * @description Acao para deletar a pessoa, e atualizar o datasource
   * @method DELETE
   * @param {Pessoa} pessoa
   * @returns {Promise} Promise
   */
  deletePessoa(pessoa: Pessoa): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient
        .delete(`${this._restService}/drop/${pessoa.id}`)
        .subscribe(
          (response: Pessoa) => {
            const deletePessoa = this.pessoas
              .map((pessoa) => {
                return pessoa.id;
              })
              .indexOf(pessoa.id);
            this.pessoas.splice(deletePessoa, 1);
            this.onPessoaChanged.next(this.pessoas);
            resolve(response);
          },
          (error: any) => {
            console.error(error);
            this._messagePessoa.pessoaErroGeneric();
          }
        );
    });
  }
}
