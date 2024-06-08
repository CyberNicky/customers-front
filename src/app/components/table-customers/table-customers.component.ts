import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  idade: number;
  genero: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Monique', idade: 1.0079, genero: 'H' },
  { position: 2, name: 'Bruno', idade: 4.0026, genero: 'He' },
  { position: 3, name: 'Davy', idade: 6.941, genero: 'Li' },
  { position: 4, name: 'João', idade: 9.0122, genero: 'Be' },
  { position: 5, name: 'Adrien', idade: 10.811, genero: 'B' },
  { position: 6, name: 'Yves', idade: 12.0107, genero: 'C' },
  { position: 7, name: 'Elisângela', idade: 14.0067, genero: 'N' },
  { position: 8, name: 'Mônica', idade: 15.9994, genero: 'O' },
  { position: 9, name: 'Samys', idade: 18.9984, genero: 'F' },
  { position: 10, name: 'Vinicius', idade: 20.1797, genero: 'Ne' },
];
@Component({
  selector: 'app-table-customers',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './table-customers.component.html',
  styleUrl: './table-customers.component.scss',
})
export class TableCustomersComponent {
  constructor(private router: Router) {}
  filterForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(''),
  });
  navigateTo(page: string) {
    // Use o router para navegar para a página desejada
    this.router.navigate([page]);
  }
  displayedColumns: string[] = ['select', 'name', 'idade', 'genero', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
