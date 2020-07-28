import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Auth } from '../auth.service';
import { Publicacao } from '../model/publicacao.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public publicacoes: Array<Publicacao>;

  @Input()
  public eeToChildAtualizarPublicacao: EventEmitter<any> = new EventEmitter();

  constructor(
    private auth: Auth,
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.auth.logout();
  }

  public eeToParentAtualizarPublicacao(event: any): void {
    this.eeToChildAtualizarPublicacao.emit(event);
    console.log('almost there')
  }

}
