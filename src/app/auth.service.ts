import { Usuario } from './model/usuario.model';

export class Auth {
    public cadastrar(usuario: Usuario): void {
        console.log('chegamos ate o servico: ', usuario);
    }
}