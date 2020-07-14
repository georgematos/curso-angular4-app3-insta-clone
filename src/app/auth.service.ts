import { Usuario } from './model/usuario.model';
import * as firebase from 'firebase';

export class Auth {
    public cadastrar(usuario: Usuario): void {
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resp): any => {
                // remover atributo senha do usuario
                delete usuario.senha

                // registrando dados complementares do usuario no path email na base 64
                // btoa: funcao nativa js que converte uma string para base 64 atob faz o contrário
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`) 
                    .set(usuario);
            })
            .catch((error: Error) => console.log(error));
    }
}