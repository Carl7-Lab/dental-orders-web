import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPage {}
