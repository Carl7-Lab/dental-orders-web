import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import FormOrderComponent from '../../components/form-orders/form-order';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { FormOrderService } from '../../services/form-order.service';
import { FormGroup } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  imports: [FormOrderComponent],
  template: `
    <form-order
      [form]="myForm"
      [pageTitle]="'Actualizar Orden'"
      [pageSubtitle]="'Actualizar una orden'"
      [submitButtonText]="'Actualizar Orden'"
      [isSubmitBlocked]="isSubmitBlocked()"
      [cancelRoute]="orders_list"
      (formSubmit)="onSubmit()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateOrder implements OnInit, OnDestroy {
  orders_list = FULL_NAVIGATION_PATHS.ORDERS_LIST;

  private orderFormService = inject(FormOrderService);
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);

  order = this.orderService.order;
  orderId: number | null = null;

  isSubmitBlocked = signal(false);

  private routeSubscription?: Subscription;

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.orderId = params['id'];

      if (this.orderId) {
        console.log('order id =>', this.orderId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  myForm: FormGroup = this.orderFormService.createForm();

  constructor() {
    effect(() => {
      const currentNote = this.order;
      if (currentNote) {
        this.orderFormService.patchFormWithOrder(this.myForm, currentNote);
      }
    });

    effect(() => {
      // TODO: si hay un error al no encuentra la orden enviar not-found page
    });
  }

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }

    this.orderFormService.onSubmit(this.myForm, (formData) => {
      console.log('Se actualizó la orden');
      this.orderFormService.navigateToOrdersList();
    });
  }
}
