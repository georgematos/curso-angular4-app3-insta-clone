import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../auth.service';
import { Usuario } from '../../model/usuario.model';
import { Animations } from '../animations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  animations: [
    Animations["animation-shake-error"]
  ]
})
export class CadastroComponent implements OnInit {

  public signUpError: string;
  public statusError: boolean = false;

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
    this.statusError = false;
    let usuario: Usuario = new Usuario(
      this.formulario.value.nome_usuario,
      this.formulario.value.nome_completo,
      this.formulario.value.email,
      this.formulario.value.senha
    );
    this.auth.cadastrar(usuario).then(() => {
        if (this.auth.signUpError === undefined) {
          this.exibirPainelDeLogin();
        } else {
          this.signUpError = this.auth.signUpError;
          this.statusError = true;
        }
    }).catch();
  }

}
