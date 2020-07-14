import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelDeLogin(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    console.log(this.formulario.value.email,"\n",this.formulario.value.senha);
  }

}
