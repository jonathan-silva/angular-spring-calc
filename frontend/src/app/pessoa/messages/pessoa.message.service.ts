import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PessoaMessageService {
  constructor() {}

  /**
   * @description Retorno Sucesso para criação de Pessoa
   * @return {void}
   */
  criadoPessoaSucesso(text: string): void {
    Swal.fire({
      title: 'Sucesso!',
      text: text,
      type: 'success',
      timer: 1500,
      showCancelButton: false,
      showConfirmButton: false,
    });
  }

  /**
   * @description Retorno generico de Erro do backend
   * @return {void}
   */
  pessoaErroGeneric(): void {
    Swal.fire({
      title: 'Erro!',
      text: 'Algo de errado aconteceu, tente novamente.',
      type: 'error',
      timer: 4000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  }

  /**
   * @description SweetAlert para deletar pessoa Condicional
   */
  async pessoaDelete(text: string): Promise<any> {
    return Swal.fire({
      title: 'Atenção',
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      reverseButtons: false,
    });
  }
}
