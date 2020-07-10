import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelDeLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    this.formulario = this.fb.group({
      nome_usuario: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      nome_completo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      senha: ['', Validators.compose([
        Validators.required,
      ])],
    })
    console.log(this.formulario);
  }

}
