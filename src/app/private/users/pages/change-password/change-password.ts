import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { UsersService } from '../../services/users.service';
import { FormChangePassComponent } from '../../components/form-change-pass/form-change-pass';
import { FormChangePassService } from '../../components/form-change-pass/form-change-pass.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { AuthService } from '../../../../public/auth/services/auth.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'change-password-page',
  imports: [FormChangePassComponent, ConfirmationModalComponent],
  templateUrl: './change-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordPage {
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private formChangePassService = inject(FormChangePassService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  userId = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('userId') ? parseInt(params.get('userId')!) : null))
    )
  );

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  usersListPath = FULL_NAVIGATION_PATHS.USERS_LIST;

  form = this.formChangePassService.createForm();
  showConfirmationModal = signal(false);

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error('Por favor, completa todos los campos requeridos');
      return;
    }

    this.showConfirmationModal.set(true);
  }

  onConfirmChangePassword() {
    this.showConfirmationModal.set(false);
    const userId = this.userId();

    const passwordData = this.form.value;

    if (userId) {
      this.usersService.updateUserPassword(userId, passwordData.newPassword).subscribe({
        next: () => {
          this.toastService.success('Contraseña actualizada correctamente');
        },
      });
    } else {
      this.usersService
        .updateUserPassword((this.authService.user() as User).id, passwordData.newPassword)
        .subscribe({
          next: () => {
            this.toastService.success('Contraseña actualizada correctamente');
          },
        });
    }
  }

  onCancelChangePassword() {
    this.showConfirmationModal.set(false);
  }
}
