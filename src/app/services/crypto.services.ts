import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {

  private apiUrl = 'https://api.coingecko.com/api/v3';

  private API_Key = 'CG-LNxXQag6nbSDbGee1wESNeRA';

  constructor() { }

  async getCryptoPrice(cryptoId: string) {
    try {   
      const response = await axios.get(`${this.apiUrl}/simple/price?ids=${cryptoId}&vs_currencies=usd`, {
        headers: {
            'x-cg-demo-api-key': this.API_Key,
            },
        
        params: {
          ids: cryptoId,
          vs_currencies: 'usd',
        },
      });
      return response.data;
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching crypto price:', error);
      return null;
    }
  }
}
