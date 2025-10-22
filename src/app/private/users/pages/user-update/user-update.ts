import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import FormUserComponent from '../../components/form-users/form-user';
import { map, tap } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../../shared/services/toast.service';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { FormUserService } from '../../components/form-users/form-user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'update-user',
  imports: [FormUserComponent, ConfirmationModalComponent, CommonModule],
  templateUrl: './user-update.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUser {
  private usersService = inject(UsersService);
  private formUserService = inject(FormUserService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  usersListPath = FULL_NAVIGATION_PATHS.USERS_LIST;

  userId = toSignal(this.route.params.pipe(map((params) => params['userId'])));

  form = this.formUserService.createForm(false); // false = no es creación, no incluir password
  showConfirmationModal = signal(false);

  userResource = rxResource({
    stream: () =>
      this.usersService.getUser(parseInt(this.userId())).pipe(
        tap((user: User) => {
          this.formUserService.patchFormWithUser(this.form, user);
        })
      ),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error('Por favor, completa todos los campos requeridos');
      return;
    }

    this.showConfirmationModal.set(true);
  }

  onConfirmUpdate() {
    this.showConfirmationModal.set(false);

    let userData = this.form.value;
    userData = { ...userData, email: undefined, phone: undefined };
    const userId = parseInt(this.userId());

    this.usersService.updateUser(userId, userData).subscribe({
      next: (user) => {
        this.toastService.success('Cliente actualizado exitosamente');
        this.router.navigate([this.fullNavigationPaths.USERS_LIST]);
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.toastService.error('Error al actualizar el usuario. Por favor, intenta nuevamente');
      },
    });
  }

  onCancelUpdate() {
    this.showConfirmationModal.set(false);
  }
}
