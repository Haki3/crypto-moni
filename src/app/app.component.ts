import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from './services/crypto.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  cryptos: any[] = [];
  isLoading = true; // Oculta la pantalla de carga después de obtener los datos

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.fetchAllCryptos();
  }

  /**
   * Obtiene la lista completa de criptomonedas y la procesa.
   */
  async fetchAllCryptos() {
    const data = await this.cryptoService.getAllCryptos();
    if (data) {
      this.cryptos = data.map((crypto: any) => ({
        name: crypto.name,
        symbol: crypto.symbol,
        price: parseFloat(crypto.priceUsd).toFixed(2),
        change: parseFloat(crypto.changePercent24Hr).toFixed(2),
      }));
      this.isLoading = false;
    }
  }
}
