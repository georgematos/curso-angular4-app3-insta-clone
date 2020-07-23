import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class DataBase {
    public publicar(publicacao: any): void {
        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push({
        //         titulo: publicacao.titulo,
        //     });
        console.log(publicacao);

        let nomeImagem = Date.now();

        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                // acompanhamento do progresso do upload
                (snapshot: any) => {
                    console.log(snapshot);
                },
                (error) => {
                    console.log(error);
                },
                // finalização do processo
                () => {
                    console.log("upload completo");
                }
            )

    }
}