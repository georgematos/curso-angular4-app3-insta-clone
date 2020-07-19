import { Usuario } from './model/usuario.model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Auth {

    private token_id: string;

    constructor(
        private router: Router
    ) { }

    public cadastrar(usuario: Usuario): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resp): any => {
                // remover atributo senha do usuario
                delete usuario.senha

                // registrando dados complementares do usuario no path email na base 64
                // btoa: funcao nativa js que converte uma string para base 64 atob faz o contrário
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario);
            })
            .catch((error: Error) => {
                console.log(error);
                alert("Ocorreu um erro ao cadastrar o usuário");
            });
    }

    public autenticar(email: string, senha: string): void {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(() => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        localStorage.setItem('idToken', idToken);
                        this.router.navigate(['/home']);
                    });
            })
            .catch((err) => { alert(err) });
    }

    public autenticado(): boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') !== null) {
            this.token_id = localStorage.getItem('idToken');
        }

        return this.token_id !== undefined;
    }

    public logout(): void {
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('idToken')
            this.token_id = undefined;
            // this.router.navigate(['/']); se eu quisesse navegar para a raiz do app, no meu caso não precisei.
        });
    }
}