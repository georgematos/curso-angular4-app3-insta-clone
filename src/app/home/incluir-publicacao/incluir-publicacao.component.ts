import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataBase } from 'src/app/database.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  private email: string;

  public formulario: FormGroup = this.fb.group({
    'titulo': [''],
  })

  constructor(
    private fb: FormBuilder,
    private dataBase: DataBase
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  public publicar(): void {
    console.log();
    this.dataBase.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
    });
  }

}
