import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import MainNavbar from '../../shared/components/main-navbar/main-navbar';

@Component({
  selector: 'private-layout',
  imports: [RouterOutlet, MainNavbar],
  templateUrl: './private-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrivateLayout {}
