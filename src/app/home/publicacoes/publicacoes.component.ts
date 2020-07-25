import { Component, OnInit } from '@angular/core';
import { DataBase } from 'src/app/database.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  private email: string;

  constructor(
    private bd: DataBase
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
      this.atualizarTimeLine();
    })
  }

  public atualizarTimeLine() {
    this.bd.obterPublicacoes(this.email);
  }
}
