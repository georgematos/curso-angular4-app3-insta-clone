import { Injectable } from '@angular/core';

@Injectable()
export class DataBase {
    public publicar(): void {
        console.log('chegamos até o servico responsavel pelo controle de dados');
    }
}