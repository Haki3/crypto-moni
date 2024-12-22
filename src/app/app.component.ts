import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoService } from './services/crypto.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
  cryptos: any[] = []; // Array para almacenar las criptomonedas
  isLoading = true; // Variable para mostrar un spinner mientras se cargan los datos
  searchTerm: string = ''; 
  sortField: string = ''; 
  sortDirection: boolean = true;

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.fetchAllCryptos();
  }

  async fetchAllCryptos() {
    // Llama al método getAllCryptos para obtener todas las criptomonedas
    const data = await this.cryptoService.getAllCryptos();
    if (data) { // Si tenemos respuestaa de la API
      // Mapeamos la estrctura deseada
      this.cryptos = data.map((crypto: any) => ({
        name: crypto.name,
        symbol: crypto.symbol,
        price: parseFloat(crypto.priceUsd).toFixed(2),
        change: parseFloat(crypto.changePercent24Hr).toFixed(2),
        // Añadimos la URL de la imagen desde pagina externa haciendo uso de la propiedad symbol en minúsculas
        iconUrl: `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`, 
        // Guardamos la URL de la página de la criptomoneda para usarla en el icono del ojo
        explorer: crypto.explorer
      }));
      this.isLoading = false; // Cambiamos el estado de isLoading a false
    }
  }

  // Método para filtrar las criptomonedas
  filteredCryptos() {
    return this.cryptos
      .filter(crypto =>
        crypto.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (this.sortField) {
          const fieldA = a[this.sortField];
          const fieldB = b[this.sortField];
          if (fieldA < fieldB) return this.sortDirection ? -1 : 1;
          if (fieldA > fieldB) return this.sortDirection ? 1 : -1;
          return 0;
        }
        return 0;
      });
  }

  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortField = field;
      this.sortDirection = true;
    }
  }
}