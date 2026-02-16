import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/layout/navbar/navbar.component';
import { FooterComponent } from './core/components/layout/footer/footer.component';
import { LoadingspinnerComponent } from './shared/components/loadingspinner/loadingspinner/loadingspinner.component';
import { SpinnerService } from './core/services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoadingspinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecommerce');

  spinnerService = inject(SpinnerService);
}
