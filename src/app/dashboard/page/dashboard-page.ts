import { ChangeDetectionStrategy, Component } from '@angular/core';
import MainNavbar from '../../shared/components/main-navbar/main-navbar';

@Component({
  selector: 'dashboard-page',
  imports: [MainNavbar],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPage {}
