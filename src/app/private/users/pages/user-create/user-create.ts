import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import FormUserComponent from '../../components/form-users/form-user';
import { FormUserService } from '../../components/form-users/form-user.service';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create-user',
  imports: [FormUserComponent, ConfirmationModalComponent, CommonModule],
  templateUrl: './user-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUser {
  private usersService = inject(UsersService);
  private formUserService = inject(FormUserService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  usersListPath = FULL_NAVIGATION_PATHS.USERS_LIST;

  form = this.formUserService.createForm();
  showConfirmationModal = signal(false);

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error('Por favor, completa todos los campos requeridos');
      return;
    }

    this.showConfirmationModal.set(true);
  }

  onConfirmCreate() {
    this.showConfirmationModal.set(false);

    const userData = this.form.value;

    this.usersService.createUser(userData).subscribe({
      next: (user) => {
        this.toastService.success('Usuario creado exitosamente');
        this.router.navigate([this.usersListPath]);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.toastService.error('Error al crear el usuario. Por favor, intenta nuevamente');
      },
    });
  }

  onCancelCreate() {
    this.showConfirmationModal.set(false);
  }
}
