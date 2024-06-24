import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';
import { RangeComponent } from './range/range.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { RangeDatePickerComponent } from './range-date-picker/range-date-picker.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [TableComponent, RangeComponent, DatePickerComponent, RangeDatePickerComponent],
})
export class AppComponent {
  isTableOverflow = false;

  pageSize = 20;

  data = [
    ['name', 'age'], // header da tabela

    ['jhon', '20'],
    ['marston', '24'],
    ['davy', '54'],
    ['superman', '29'],
    ['marston', '65'],
    ['wolverine', '25'],
    ['jhon', '20'],
    ['davy', '21'],
    ['superman', '43'],
    ['wolverine', '32'],
    ['marston', '24'],
    ['jhon', '20'],
    ['davy', '31'],
    ['jhon', '54'],
    ['superman', '32'],
    ['wolverine', '45'],
    ['davy', '54'],
    ['marston', '34'],
    ['superman', '33'],
    ['wolverine', '32'],
    ['superman', '29'],
  ];

  date = new Date(2023, 10, 1);

  debug(value: unknown) {
    console.log(value);
  }
}
