import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})
export class CurrencyComponent {
  inputNumber = '';
  output = '';
  amountInput = 1;
  currencyInput = '';
  currencyOutput = 0;
  convertedAmount = 0;
  displayResult = false;
  currencyName = '';
  getCurrencyValue = 0;
  receivedAmount = 0;
  feeInBDT = 0;
  fee = 0;

  currencyForm = new FormGroup({
    payMethod: new FormControl<string>('', [Validators.required]),
    inputAmount: new FormControl<number>(0, [
      Validators.required,
      Validators.max(20000),
      Validators.min(10),
    ]),
    select: new FormControl<string>('', [Validators.required]),
  });

  getTotalFee(): number {
    if (this.currencyForm.get('payMethod')?.value === 'instant')
      return (this.fee = 3.99);
    if (this.currencyForm.get('payMethod')?.value === 'regular')
      return (this.fee = 1.99);
    else {
      return 0;
    }
  }

  inputAmount = (event: Event) => {
    const value = parseInt((<HTMLInputElement>event.target).value);
    this.amountInput = value;
  };

  currencySelect = (event: Event) => {
    const value = (<HTMLInputElement>event.target).value;
    this.currencyInput = value;
    this.convertedCurrency(this.currencyInput);
  };

  convertedCurrency(currencyValue: string) {
    if (currencyValue === 'usd') {
      this.convertedAmount = this.amountInput * 112;
    } else if (currencyValue === 'eur') {
      this.convertedAmount = this.amountInput * 125;
    } else if (currencyValue === 'cad') {
      this.convertedAmount = this.amountInput * 84;
    } else {
      this.convertedAmount = 0;
    }
  }
  selectedCurrency(Value: string): string {
    if (Value === 'usd') {
      this.getCurrencyValue = 112;
      return 'USD';
    } else if (Value === 'eur') {
      this.getCurrencyValue = 125;
      return 'EUR';
    } else if (Value === 'cad') {
      this.getCurrencyValue = 84;
      return 'CAD';
    } else {
      this.getCurrencyValue = 0;
      return '';
    }
  }

  showScore(): void {
    this.displayResult = true;
    this.currencyName = this.selectedCurrency(this.currencyInput);
    this.feeInBDT = this.getTotalFee() * this.getCurrencyValue;
    this.receivedAmount = this.convertedAmount - this.feeInBDT;
  }
}
