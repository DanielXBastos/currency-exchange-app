import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open';
  private apiKey = 'RVZG0GHEV2KORLNA';

  constructor(private http: HttpClient) {}

  // obtem a taxa de câmbio atual da API
  currentExchangeRate(fromSymbol: string, toSymbol: string): Observable<any> {
    const url = `${this.apiUrl}/currentExchangeRate`;

    return this.http.get<any>(`${url}?apiKey=${this.apiKey}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`);
  }

  // obtem os dados dos últimos 30 dias da API
  dailyExchangeRate(fromSymbol: string, toSymbol: string): Observable<any> {
    const url = `${this.apiUrl}/dailyExchangeRate`;

    return this.http.get<any>(`${url}?apiKey=${this.apiKey}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`);
  }
}
