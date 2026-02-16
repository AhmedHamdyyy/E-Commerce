import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  // npm install spinners-angular --legacy-peer-deps
  // the best liberary for spinner in angular (Preformance)

  //display spinner before request
  const spinnerService = inject(SpinnerService);

  // إظهار الـ spinner
  spinnerService.show();

  return next(req).pipe(
    finalize(() => {
      // إخفاء الـ spinner بعد انتهاء الـ request
      spinnerService.hide();
    })
  );
};
