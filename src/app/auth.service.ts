import { Usuario } from './model/usuario.model';
import * as firebase from 'firebase';

export class Auth {
    public cadastrar(usuario: Usuario): void {
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resp): any => console.log(resp))
            .catch((error: Error) => console.log(error));
    }
}