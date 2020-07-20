import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'src/app/auth.service';
import { Animations } from '../animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    Animations["animation-shake-error"]
  ]
})
export class LoginComponent implements OnInit {

  public authError: string;
  public statusError: boolean = false;

  public formulario = this.fb.group({
    'email': ['', Validators.compose([
      Validators.required,
      Validators.email,
    ])],
    'senha': ['', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])]
  })

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    public auth: Auth
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelDeLogin(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    this.statusError = false;
    this.auth.autenticar(this.formulario.value.email, this.formulario.value.senha)
      .then(() => {
        if (this.auth.authError !== undefined) {
          this.statusError = true;
          this.authError = this.auth.authError;
        }
      });
  }

}
