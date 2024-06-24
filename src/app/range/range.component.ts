import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-range',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './range.component.html',
  styleUrl: './range.component.css',
})
export class RangeComponent {
  #fb = inject(FormBuilder);

  form = this.#fb.group({
    min: this.#fb.control<number | null>(null),
    between: this.#fb.control<number | null>(null),
    max: this.#fb.control<number | null>(null),
  });

  constructor() {
    const onChange = () => {
      this.form.controls.between.addValidators([
        Validators.min(this.form.controls.min.value || 0),
        Validators.max(this.form.controls.max.value || 0),
      ]);
    };
    this.form.controls.min.registerOnChange(onChange);
    this.form.controls.max.registerOnChange(onChange);
  }

  getError(): string {
    let invalid = '';
    const controls = this.form.controls;
    for (const name in controls) {
      if (this.form.get(name)!.invalid) {
        invalid += ` <br />${name} =>  ${JSON.stringify(
          this.form.get(name)?.errors
        )}`;
      }
    }
    return invalid;
  }
}
