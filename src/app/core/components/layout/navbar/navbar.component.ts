import { Component, computed, effect, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../../services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MytranslateService } from '../../../services/translate/mytranslate.service';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;

  currentLang: string = 'default';

  CartItemsCount: WritableSignal<number> = signal<number>(0);
  // WishlistItemsCount: WritableSignal<number> = signal<number>(0);

  WishlistItemsCount: Signal<number> = computed(() =>
    this._wishlistService.NumberofItemsInWishList()
  );

  constructor(private flowbiteService: FlowbiteService, public authService: AuthService, public _cartService: CartService, public _wishlistService: WishlistService) {

    // في حالة signal
    effect(() => {
      if (this.authService.userData() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    })

    effect(() => {
      console.log('NavBar WishlistItemsCount Changed:', this.WishlistItemsCount());
    });

  }

  _translateService: MytranslateService = inject(MytranslateService);

  ngOnInit(): void {

    this._cartService.NumberofItemsInCart.subscribe({
      next: (data) => {
        this.CartItemsCount.set(data);
        console.log('NavBarNumberofItemsInCart', this.CartItemsCount());
      }
    })

    // في حالة BehaviorSubject
    // this.authService.userData.subscribe( data => { 
    //   if(data != null){
    //     this.isLogin = true;
    //   }else{
    //     this.isLogin = false;
    //   }

    //   console.log(data);
    // })

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

}