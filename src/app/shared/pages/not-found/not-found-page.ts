import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found-page',
  imports: [],
  templateUrl: './not-found-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFoundPage {
  constructor(private router: Router) {}

  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
