import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const _toastrService: ToastrService = inject(ToastrService);

  // 1.catch error
  // 2.show toast display error message
  // 3.throw error
  // 4.modify error response >> observable(response) >> rxjs operator >> function >> pipe operator

  return next(req).pipe(
    catchError((err) => {
      _toastrService.info(err.error.message);
      console.error(err.error.message);
      return throwError(() => err);
    })
  );
};
