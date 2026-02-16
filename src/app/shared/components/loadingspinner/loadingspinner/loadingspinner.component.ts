import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loadingspinner',
  imports: [CommonModule],
  templateUrl: './loadingspinner.component.html',
  styleUrl: './loadingspinner.component.scss',
})
export class LoadingspinnerComponent {

  @Input() show = false;
  @Input() size = 60;
  @Input() color = '#007bff';
  @Input() message = '';

}
