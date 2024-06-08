import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersManagementService } from '../../services/customers-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-new-customers',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-new-customers.component.html',
  styleUrl: './register-new-customers.component.scss',
})
export class RegisterNewCustomersComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    age: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    gender: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  customerId?: string | null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomersManagementService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.customerId) this.patchForm();
  }
  patchForm() {
    if (this.customerId) {
      this.customerService.getCustomer(+this.customerId).subscribe({
        next: ({ name, age, gender }) =>
          this.registerForm.patchValue({ name, age: `${age}`, gender }),
      });
    }
  }
  navigateTo(page: string) {
    // Use o router para navegar para a página desejada
    this.router.navigate([page]);
  }

  createCustomer() {
    if (this.registerForm.valid) {
      const { name, gender, age } = this.registerForm.getRawValue();
      this.customerService
        .createCustomers({ name, gender, age: +age })
        .subscribe({
          next: () => {
            this._snackBar.open('Cliente cadastrado com sucesso!', 'OK', {
              duration: 6000,
            });
            this.navigateTo('clientes');
          },
        });
    }
  }
  updateCustomers() {
    if (this.registerForm.valid && this.customerId) {
      const { name, gender, age } = this.registerForm.getRawValue();
      this.customerService
        .updateCustomers(+this.customerId, { name, gender, age: +age })
        .subscribe({
          next: () => {
            this._snackBar.open('Cliente editado com sucesso!', 'OK', {
              duration: 6000,
            });
            this.navigateTo('clientes');
          },
        });
    }
  }
}
