import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AcessoComponent } from './acesso/acesso.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BannerComponent } from './acesso/banner/banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { LoginComponent } from './acesso/login/login.component';

import { Auth } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { DataBase } from './database.service';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';

@NgModule({
  declarations: [
    AcessoComponent,
    AppComponent,
    BannerComponent,
    CadastroComponent,
    LoginComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    Auth,
    AuthGuard,
    DataBase,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
