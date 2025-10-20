import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';

@Component({
  selector: 'auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthLayout {
  authSignInPath = FULL_NAVIGATION_PATHS.AUTH_SIGN_IN;
  authSignUpPath = FULL_NAVIGATION_PATHS.AUTH_SIGN_UP;
}
