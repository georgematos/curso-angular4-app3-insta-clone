import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../model/usuario.model';
import { Auth } from '../../auth.service';

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
      private fb: FormBuilder,
      public auth: Auth
  ) { }

  ngOnInit(): void {
    this.formValidationInit();
  }

  public exibirPainelDeLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    let usuario: Usuario = new Usuario(
      this.formulario.value.nome_usuario,
      this.formulario.value.nome_completo,
      this.formulario.value.email,
      this.formulario.value.senha
    );
    this.auth.cadastrar(usuario);
  }

  private formValidationInit(): void {
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
  }
}
