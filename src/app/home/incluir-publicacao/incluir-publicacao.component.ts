import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataBase } from 'src/app/database.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public formulario: FormGroup = this.fb.group({
    'titulo': [''],
  })

  constructor(
    private fb: FormBuilder,
    private dataBase: DataBase
  ) { }

  ngOnInit(): void {

  }

  public publicar(): void {
    console.log(this.formulario.value.titulo);
    this.dataBase.publicar();
  }

}
