import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataBase } from 'src/app/database.service';
import { Progresso } from 'src/app/progresso.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  private email: string;
  private image: any;

  public statusPublicacao: string = 'pendente';
  public porcentagemUpload: number;

  public formulario: FormGroup = this.fb.group({
    'titulo': [''],
  })

  constructor(
    private fb: FormBuilder,
    private dataBase: DataBase,
    private progresso: Progresso
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  public publicar(): void {
    this.dataBase.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.image[0]
    });

    let progressoUpload = interval(500);

    let continua = new Subject();
    continua.next(true);

    progressoUpload
    .pipe(takeUntil(continua))
    .subscribe(() => {
      console.log(this.progresso.status)
      console.log(this.progresso.progrecaoUpload)
      this.statusPublicacao = 'andamento';

      this.porcentagemUpload = Math.round((this.progresso.progrecaoUpload.bytesTransferred / this.progresso.progrecaoUpload.totalBytes) * 100);

      if(this.progresso.status === 'concluido') {
        this.statusPublicacao = 'concluido';
        continua.next(false);
      }
    })

  }

  public prepareUploadImage(event: Event): void {
    this.image = ((<HTMLInputElement>event.target).files);
  }
}
