import { Component, OnInit } from '@angular/core';
import { CryptoService } from './services/crypto.services';
import  { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cryptoPrices: any = {};

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.getCryptoPrices();
  }

  async getCryptoPrices() {
    const cryptos = ['bitcoin', 'ethereum', 'cardano']; // Puedes agregar más criptomonedas aquí
    for (let crypto of cryptos) {
      const price = await this.cryptoService.getCryptoPrice(crypto);
      this.cryptoPrices[crypto] = price ? price[crypto].usd : 'Error';
    }
  }
}
