import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'src/app/auth.service';
import { trigger, state, style, transition, keyframes, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('animation-login-error', [
      state('void', style({
        opacity: 1
      })),
      transition('void => erro-ocorrido', [
        animate('1000ms 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 1, opacity: 1, transform: 'translateY(0)' })
        ]))
      ])
    ])
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
        if(this.auth.authError !== undefined) {
          this.statusError = true;
          this.authError = this.auth.authError;
        }
      });
  }

}
