import { Component, OnInit } from '@angular/core';
import { Animations } from './animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    Animations["animacao-banner"],
    Animations["animacao-painel"]
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado';
  public estadoPainel: string = 'criado';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false;
  }

  public inicioDaAnimacao(): void {
    // console.log('inicio da animacao');
  }

  public fimDaAnimacao(): void {
    // console.log('fim da animacao');
  }

}
