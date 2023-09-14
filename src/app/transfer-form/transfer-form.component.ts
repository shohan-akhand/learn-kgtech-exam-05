import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css'],
})
export class TransferFormComponent {
  inputNumber = '';
  output = '';

  transferForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    cardNumber: new FormControl<number>(0, [
      Validators.pattern('^[0-9]{16}$'),
      Validators.required,
    ]),
  });
  get emailErrors(): ValidationErrors | null | undefined {
    return this.transferForm.get('email')?.errors;
  }

  onInput = (event: Event) => {
    const value = (<HTMLInputElement>event.target).value;
    this.inputNumber = value;
    this.checkDigit();
  };
  checkDigit() {
    if (this.inputNumber.length >= 1) {
      const firstDigit = this.inputNumber.charAt(0);
      switch (firstDigit) {
        case '4':
          this.output = 'Visa';
          break;
        case '5':
          this.output = 'MasterCard';
          break;
        case '6':
          this.output = 'Discover';
          break;
      }
    } else {
      this.output = 'none';
    }
  }
}
