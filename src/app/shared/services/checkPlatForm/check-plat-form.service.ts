import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CheckPlatFormService {

  //يستخدم لما اكون عايز run code in browser only
  //مثال: localstorage

  constructor(@Inject(PLATFORM_ID) private platformid: Object) { }

  checkIsPlatFormBrowser() {
    if (isPlatformBrowser(this.platformid)) {
      return true;
    }
    else {
      return false;
    }
  }

}
