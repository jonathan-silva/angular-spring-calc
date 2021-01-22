export class Pessoa {
  'id': string;
  'nm_pessoa': string;

  /**
   * Constructor
   * @param pessoa
   */
  constructor(pessoa) {
    {
      this.id = pessoa.id || '';
      this.nm_pessoa = pessoa.nm_pessoa || '';
    }
  }
}
