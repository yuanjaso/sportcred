import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() data;
  @Input() valueAccessors: (() => any)[];
  @Input() headers: string[];

  constructor() {}
  ngAfterViewInit(): void {
    this.data = new MatTableDataSource(this.data);

    console.log(this.data, this.paginator);
    this.data.paginator = this.paginator;
  }

  ngOnInit(): void {}
}
