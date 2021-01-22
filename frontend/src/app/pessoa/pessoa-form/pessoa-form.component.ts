import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { coreAnimations } from '../../shared/animations';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: coreAnimations,
})
export class PessoaFormComponent implements OnInit {
  pessoaForm: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _pessoaService: PessoaService
  ) {
    this.pessoaForm = this.createPessoaForm();
  }

  ngOnInit(): void {}

  createPessoaForm(): FormGroup {
    return this._formBuilder.group({
      nm_pessoa: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(2),
        ],
      ],
    });
  }

  saveForm(): void {
    this._pessoaService.storePessoa(this.pessoaForm.getRawValue());
    this.pessoaForm = this.createPessoaForm();
  }
}
