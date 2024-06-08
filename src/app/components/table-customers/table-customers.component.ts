import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerInterface } from '../../interfaces/customer-interface';
import { CustomersManagementService } from '../../services/customers-management.service';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-table-customers',
  standalone: true,
  imports: [
    NgClass,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table-customers.component.html',
  styleUrl: './table-customers.component.scss',
})
export class TableCustomersComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'idade', 'genero', 'edit'];
  selection = new SelectionModel<CustomerInterface>(true, []);
  filterForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    age: new FormControl('', { nonNullable: true }),
    gender: new FormControl('', { nonNullable: true }),
  });
  dataSource = new MatTableDataSource<CustomerInterface>([]);

  constructor(
    private router: Router,
    private customerService: CustomersManagementService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('name') ?? '';

    this.filterForm.patchValue({ name });

    this.getCustomers();
  }
  getCustomers() {
    this.selection.clear();
    const params = this.filterForm.value;
    console.log(params);
    this.customerService.getCustomers(params).subscribe({
      next: (customers) => {
        this.dataSource.data = customers;
      },
    });
  }
  clearFilters() {
    this.filterForm.reset();
    this.getCustomers();
  }
  deleteCustomers() {
    const subscribers = this.selection.selected.map((customer) =>
      this.customerService.deleteCustomers(customer.id)
    );
    forkJoin(subscribers).subscribe({
      next: () => {
        this.getCustomers();
        this.selection.clear();
        this._snackBar.open('Cliente excluído com sucesso!', 'OK', {
          duration: 6000,
        });
      },
    });
  }

  navigateTo(page: string) {
    // Use o router para navegar para a página desejada
    this.router.navigate([page]);
  }

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
}
