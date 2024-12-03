import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})

export class CryptoService {
  private apiUrl = 'https://api.coincap.io/v2';

  constructor() {}

  // Método para obtener todas las criptomonedas
  async getAllCryptos() {
    try {
      const response = await axios.get(`${this.apiUrl}/assets`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      return [];
    }
  }
}
