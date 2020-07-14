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

    public formulario = this.fb.group({
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
    
    @Output()
    public exibirPainel: EventEmitter<string> = new EventEmitter<string>();
    
    constructor(
      private fb: FormBuilder,
      public auth: Auth
  ) { }

  ngOnInit(): void {
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

}
