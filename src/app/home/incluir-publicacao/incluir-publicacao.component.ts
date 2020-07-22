import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public formulario: FormGroup = this.fb.group({
    'titulo': [''],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  public publicar(): void {
    console.log(this.formulario.value.titulo);
  }

}
