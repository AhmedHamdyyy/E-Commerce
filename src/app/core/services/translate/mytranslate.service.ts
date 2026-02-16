import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CheckPlatFormService } from '../../../shared/services/checkPlatForm/check-plat-form.service';

@Injectable({
  providedIn: 'root',
})
export class MytranslateService {

  _translateService: TranslateService = inject(TranslateService);

  _checkPlatFormService: CheckPlatFormService = inject(CheckPlatFormService);

  constructor() {
    if (this._checkPlatFormService.checkIsPlatFormBrowser()) {
      let defaultLang: string = 'en';

      // check localStorage Lang
      if (localStorage.getItem('lang') != null) {
        defaultLang = localStorage.getItem('lang')!;
      }
      // 2.fallback lang
      this._translateService.setFallbackLang(defaultLang);
      // 3.apply lang >> use
      this._translateService.use(defaultLang);
      // 4.change direction (call changeDirection method)
      this.changeDirection(defaultLang);
    }
  }

  changeLanguage(lang: string) {

    // 1.save lang in local storage
    localStorage.setItem('lang', lang)

    // 2.fallback lang
    this._translateService.setFallbackLang(lang);

    // 3.apply lang >> use
    this._translateService.use(lang);

    // 4.change direction (call changeDirection method)
    this.changeDirection(lang);

  }

  changeDirection(lang: string) {
    document.dir = lang === 'ar' ? 'rtl' : 'ltr'

    // if (lang === 'ar') {
    //   document.dir = 'rtl'
    // } else {
    //   document.dir = 'ltr'
    // }
  }

}
