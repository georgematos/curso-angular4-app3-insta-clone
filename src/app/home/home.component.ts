import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // cria uma instancia do componente filho publicacoes através da variavel de referencia publicacoes do template
  @ViewChild('publicacoesComponent')
  public publicacoesComponent: any;

  constructor(
    private auth: Auth,
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.auth.logout();
  }

  public eeToHomeAtualizarPublicacao(): void {
    this.publicacoesComponent.atualizarTimeLine();
  }

}
