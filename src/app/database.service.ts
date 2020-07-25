import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';
import { Publicacao } from './model/publicacao.model';

@Injectable()
export class DataBase {

    constructor(
        private progresso: Progresso
    ) { }

    public publicar(publicacao: any): void {
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({
                titulo: publicacao.titulo,
            }).then((resp: any) => {
                let nomeImagem = resp.key;
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        // acompanhamento do progresso do upload
                        (snapshot: any) => {
                            this.progresso.status = 'andamento';
                            this.progresso.progrecaoUpload = snapshot;
                        },
                        (error) => {
                            this.progresso.status = 'erro';
                        },
                        // finalização do processo
                        () => {
                            this.progresso.status = 'concluido';
                        }
                    )
            });
    }

    public obterPublicacoes(email: string): any {
        let publicacoes: Array<Publicacao> = [];
        firebase.database().ref(`publicacoes/${btoa(email)}`)
            .once('value')
            .then((snapshot: any) => {
                snapshot.forEach((childOf: any) => {
                    firebase.storage().ref()
                        .child(`imagens/${childOf.key}`)
                        .getDownloadURL()
                        .then((url: string) => {
                            publicacoes.push(new Publicacao(childOf.val().titulo, url));
                        })
                });
            })
            .finally(() => {
                console.log(publicacoes);
            })
    }
}