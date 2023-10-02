import { Component } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
})
export class CurrencyExchangeComponent {
  calledDaily = false;
  showResult = false;
  isExpanded = false;
  lastUpdatedAt?: Date;
  exchangeRate?: number;
  last30DaysData?: any[];
  currencyCode: string = '';
  validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

  constructor(private exchangeRateService: ExchangeRateService) { }

  getExchangeRate() {
    if (this.currencyCode) {
      this.calledDaily = true;
      this.exchangeRateService.currentExchangeRate(this.currencyCode, 'JPY').subscribe((data: any) => {
        this.showResult = true;
        this.lastUpdatedAt = new Date(data.lastUpdatedAt);
        this.exchangeRate = data.exchangeRate;
      });
    }
  }

  toggleLast30Days() {
    if (this.calledDaily && this.currencyCode) {
      if (!this.isExpanded) {
        this.exchangeRateService.dailyExchangeRate(this.currencyCode, 'JPY').subscribe((data: any) => {
          this.calledDaily = true
          this.isExpanded = !this.isExpanded;
          this.last30DaysData = data.data;
        });
      } else if (this.isExpanded) {
        this.isExpanded = !this.isExpanded;
      }
    }
  }

  calculateCloseDiff(data: any): number {
    if (data && data.open !== undefined && data.close !== undefined) {
      const open = data.open;
      const close = data.close;
      const diff = (close - open) / open * 100; // Calcula a diferença percentual

      return Number(diff.toFixed(2));
    }

    return 0;
  }

  getDiffClass(data: any): string {
    const diff = this.calculateCloseDiff(data);
    return diff >= 0 ? 'positive' : 'negative';
  }

  isSuccess(value: number): boolean {
    return value >= 0;
  }

    // Método para verificar se o código da moeda é válido
    hasValidCurrency(): boolean {
      const upperCaseCode = this.currencyCode.toUpperCase();
      return !this.validCurrencies.includes(upperCaseCode) && this.currencyCode.length == 3;
    }

    disableCurrency(): boolean {
      return this.currencyCode.length < 3;
    }
}
