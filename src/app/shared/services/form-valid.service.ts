import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtils {
  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'email':
          return 'Este campo debe ser un email válido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors[key].requiredLength} caracteres`;
        case 'maxlength':
          return `Este campo debe tener como máximo ${errors[key].requiredLength} caracteres`;
        case 'pattern':
          return 'Este campo debe coincidir con el patrón requerido';
        case 'passwordMismatch':
          return 'Las contraseñas no coinciden';
        default:
          return null;
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }

  static passwordMatchValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordField);
      const confirmPassword = control.get(confirmPasswordField);

      if (!password || !confirmPassword) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        // Limpiar el error si las contraseñas coinciden
        if (confirmPassword.errors && confirmPassword.errors['passwordMismatch']) {
          delete confirmPassword.errors['passwordMismatch'];
          if (Object.keys(confirmPassword.errors).length === 0) {
            confirmPassword.setErrors(null);
          }
        }
        return null;
      }
    };
  }
}
