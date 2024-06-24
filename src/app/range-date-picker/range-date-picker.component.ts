import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';

@Component({
  selector: 'app-range-date-picker',
  standalone: true,
  imports: [DatePickerComponent],
  templateUrl: './range-date-picker.component.html',
  styleUrl: './range-date-picker.component.css',
})
export class RangeDatePickerComponent {
  @Input() startDate = new Date();

  @Input() endDate = new Date();

  minEndDate: Date | null = null;

  @Output() selectDate = new EventEmitter<Date>();

  constructor() {
    this.startDate.setHours(0);
    this.startDate.setMinutes(0);
    this.startDate.setMinutes(0);

    this.endDate.setDate(this.startDate.getDate() + 1);
    this.endDate.setHours(0);
    this.endDate.setMinutes(0);
    this.endDate.setMinutes(0);
  }

  onSelectStartDate(date: Date) {
    this.minEndDate = new Date(date);
    this.minEndDate.setDate(this.minEndDate.getDate() + 1);
    this.minEndDate.setHours(0);
    this.minEndDate.setMinutes(0);
    this.minEndDate.setMinutes(0);
  }

  onSelectEndDate(date: Date) {
    this.endDate = date;
    this.endDate.setHours(0);
    this.endDate.setMinutes(0);
    this.endDate.setMinutes(0);
    console.log(date);
  }
}
