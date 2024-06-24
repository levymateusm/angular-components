import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
})
export class DatePickerComponent {
  protected months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  @Input() date = new Date();

  @Output() selectDate = new EventEmitter();

  constructor() {
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
  }

  get month() {
    return this.months[this.date.getMonth()];
  }

  get daysOfWeek() {
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - date.getDay() + i);
      return date.toLocaleDateString(window.navigator.language, { weekday: 'narrow' });
    });
    return daysOfWeek;
  }

  get dates() {
    const grid = [];
    const daysOfWeekCount = 7;
    const rowsCount = 6;

    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);

    // primeiro dia do mes
    const pivotDate = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      1,
      0,
    );

    // ultimo dia do mes anterior
    const prevDate = new Date(pivotDate);
    prevDate.setDate(prevDate.getDate() - 1);

    // primeiro dia da tabela de datas
    const firstDate = new Date(
      prevDate.getFullYear(),
      prevDate.getMonth(),
      prevDate.getDate() - prevDate.getDay()
    );

    let count = 0;

    for (let i = 0; i < rowsCount; i++) {
      grid[i] = Array.from({ length: daysOfWeekCount }).map(() => {
        const date = new Date(firstDate);
        date.setDate(date.getDate() + count++);
        return date;
      });
    }

    return grid;
  }

  protected prevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.selectDate.emit(this.date);
  }

  protected nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.selectDate.emit(this.date);
  }

  protected setCurrentDate(date: Date) {
    this.date = date;
    this.selectDate.emit(this.date);
  }

  protected isValidActiveDate(dateA: Date, dateB: Date) {
    return (
      dateA.getDate() === dateB.getDate() &&
      dateA.getMonth() === dateB.getMonth()
    );
  }
}
