import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import FormOrderComponent from '../../components/form-orders/form-order';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { FormOrderService } from '../../services/form-order.service';
import { FormGroup } from '@angular/forms';

@Component({
  imports: [FormOrderComponent],
  template: `
    <form-order
      [form]="myForm"
      [pageTitle]="'Crear Orden'"
      [pageSubtitle]="'Crear una nueva orden'"
      [submitButtonText]="'Crear Orden'"
      [isSubmitBlocked]="isSubmitBlocked()"
      [cancelRoute]="orders_list"
      (formSubmit)="onSubmit()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrder {
  orders_list = FULL_NAVIGATION_PATHS.ORDERS_LIST;

  private orderFormService = inject(FormOrderService);

  isSubmitBlocked = signal(false);

  myForm: FormGroup = this.orderFormService.createForm();

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }

    this.orderFormService.onSubmit(this.myForm, (formData) => {
      console.log(formData);
    });
  }
}
