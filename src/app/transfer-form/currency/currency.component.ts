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
  displayResult = false;

  currencyForm = new FormGroup({
    payMethod: new FormControl<string>('', [Validators.required]),
    inputAmount: new FormControl<number>(0, [
      Validators.required,
      Validators.max(20000),
      Validators.min(10),
    ]),
    select: new FormControl('', [Validators.required]),
  });
  showScore(): void {
    this.displayResult = true;
  }
  getSalutation() {
    if (this.currencyForm.get('payMethod')?.value === 'instant') return '3.99';
    if (this.currencyForm.get('payMethod')?.value === 'regular') return '1.99';
    return '';
  }
}
