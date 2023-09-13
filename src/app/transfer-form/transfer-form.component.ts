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
  transferForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });
  get emailErrors(): ValidationErrors | null | undefined {
    return this.transferForm.get('email')?.errors;
  }
}
