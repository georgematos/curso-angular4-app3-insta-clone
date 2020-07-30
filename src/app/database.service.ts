import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Publicacao } from './model/publicacao.model';
import { Progresso } from './progresso.service';

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

    public obterPublicacoes(email: string): Promise<any> {

        return new Promise((resolve, reject) => {

            let publicacoes: Array<Publicacao> = [];
            
            firebase.database().ref(`publicacoes/${btoa(email)}`)
            .orderByKey()
            .once('value')
            .then((snapshot: any) => {
                    snapshot.forEach((childOf: any) => {
                        let publicacao = childOf.val();
                        publicacao.key = childOf.key;
                        publicacoes.push(publicacao);
                    })

                    return publicacoes.reverse();
                }).then((publicacoes: any) => {
                    publicacoes.forEach((pub: any) => {
                        firebase.storage().ref()
                            .child(`imagens/${pub.key}`)
                            .getDownloadURL()
                            .then((url_imagem: string) => {
                                pub.url_imagem = url_imagem;
                                pub.titulo = pub.titulo;
                                firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        pub.nome_usuario = snapshot.val().userName;
                                    })
                            })
                    })
                    
                })
                .finally(() => {
                    resolve(publicacoes);
                });
        })
    }

}