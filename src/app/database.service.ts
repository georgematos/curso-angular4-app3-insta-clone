import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class DataBase {
    public publicar(publicacao: any): void {
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({
                titulo: publicacao.titulo,
            });
    }
}