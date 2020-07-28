import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataBase } from 'src/app/database.service';
import { Publicacao } from 'src/app/model/publicacao.model';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  private email_usuario: string;
  public publicacoes: Array<Publicacao>;

  constructor(
    private bd: DataBase
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email_usuario = user.email;
      this.atualizarTimeLine();
    })
  }

  public atualizarTimeLine() {
    this.bd.obterPublicacoes(this.email_usuario)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes;
      });
  }
}
