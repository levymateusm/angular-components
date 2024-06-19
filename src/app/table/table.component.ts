import { NgFor } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild('table') table: ElementRef<HTMLTableElement> | null = null;
  @ViewChild('root') root: ElementRef<HTMLElement> | null = null;

  @Input() data: string[][] = [[]];

  @Input() @Output() pageSize = 0;

  @Input() canScroll = true;

  protected _page = 0;

  protected pagesCount = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.pagesCount = Math.floor(this.rowsCount / this.pageSize);
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      if (!this.canScroll && this.isOverflown()) {
        this.calcNewPageSize();
      }
    });
    this.cd.detectChanges();
  }

  private calcNewPageSize() {
    const root = this.root?.nativeElement;
    let newPageSize = 5;
    if (root) {
      const rect = root.getBoundingClientRect();
      const rowHeight = 20;
      newPageSize = Math.floor(rect.height / rowHeight) - 5;
    }
    this.pageSize = newPageSize;
  }

  protected get page() {
    return this._page;
  }

  protected set page(page: number) {
    this._page = page;

    if (this._page <= 0) {
      this._page = 0;
    }

    if (this._page >= this.pagesCount) {
      this._page = this.pagesCount;
    }
  }

  protected get header() {
    return this.data.slice(0, 1) || [[]];
  }

  protected get columns() {
    return this.header[0].length;
  }

  protected get rowsCount() {
    return this.data.slice(1, this.data.length).length;
  }

  protected get rows() {
    const start = this.pageSize * this.page + 1;
    const end = start + this.pageSize;
    const rows = this.data.slice(start, end);

    rows.forEach((row, index, array) => {
      if (row.length !== this.columns) {
        console.warn(`Invalid row ${index} of page ${this.pageSize} length.`);
        array[index] = Array.from({ length: this.columns });
      }
    });

    return rows || [[]];
  }

  isOverflown() {
    const table = this.table?.nativeElement;
    if (table) {
      return (
        table.scrollHeight > table.clientHeight ||
        table.scrollWidth > table.clientWidth
      );
    }
    return false;
  }
}
