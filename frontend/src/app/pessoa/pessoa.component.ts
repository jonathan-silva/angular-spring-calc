import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { coreAnimations } from '../shared/animations';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: coreAnimations,
})
export class PessoaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
