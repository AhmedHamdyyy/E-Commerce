import { HttpInterceptorFn } from '@angular/common/http';
import { CheckPlatFormService } from '../../../shared/services/checkPlatForm/check-plat-form.service';
import { inject } from '@angular/core';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {

  const _checkPlatFormService: CheckPlatFormService = inject(CheckPlatFormService)

  if (_checkPlatFormService.checkIsPlatFormBrowser()) {

    //هنا بعمل check على ال url عشان اضيف ال token
    //لو عايز احدد url معينه اضيف عليها ال token
    if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist') || req.url.includes('user') || req.url.includes('wishlist')) {

      //باخد نسخه من ال request بعدل عليها
      req = req.clone({
        headers: req.headers.set('token', localStorage.getItem('userToken') || '')
      });
    }

  }

  return next(req);
};
