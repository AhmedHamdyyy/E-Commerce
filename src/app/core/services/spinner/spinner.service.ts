import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  private _loading = signal(false);
  private _message = signal('');
  private requestCount = 0;

  // Getters
  loading = this._loading.asReadonly();
  message = this._message.asReadonly();

  show(message?: string) {
    this.requestCount++;
    this._loading.set(true);
    if (message) {
      this._message.set(message);
    }
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this._loading.set(false);
      this._message.set('');
    }
  }

  forceHide() {
    this.requestCount = 0;
    this._loading.set(false);
    this._message.set('');
  }
}
