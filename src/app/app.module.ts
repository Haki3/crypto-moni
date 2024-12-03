import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

import { AppComponent } from './app.component';
import { CryptoService } from './services/crypto.services'; // Asegúrate de que CryptoService esté importado

@NgModule({
    
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule, // Añade HttpClientModule aquí
    AppComponent
  ],
  providers: [CryptoService], // Asegúrate de que CryptoService esté en los proveedores
})
export class AppModule { }