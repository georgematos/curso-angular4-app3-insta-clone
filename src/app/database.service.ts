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
            .put(publicacao.imagem);
    }
}