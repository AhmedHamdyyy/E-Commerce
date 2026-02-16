import { Routes } from '@angular/router';
import { HomeComponent } from './features/components/home/home.component';
import { CartComponent } from './features/components/cart/cart.component';
import { ProductsComponent } from './features/components/products/products.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { LoginComponent } from './core/components/auth/login/login.component';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { ForgetpasswordComponent } from './core/components/auth/forgetpassword/forgetpassword.component';
import { ProductdetailsComponent } from './features/components/productdetails/productdetails.component';
import { ShippingaddressComponent } from './features/components/shippingaddress/shippingaddress.component';
import { AllordersComponent } from './features/components/allorders/allorders.component';
import { WishlistComponent } from './features/components/wishlist/wishlist/wishlist.component';

// guard : function :boolean value

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', title: 'home' },
    { path: 'home', component: HomeComponent, title: 'home' },
    { path: 'cart', canActivate: [authGuard], component: CartComponent, title: 'cart' },
    { path: 'products', component: ProductsComponent, title: 'products' },
    { path: 'productdetails/:id', component: ProductdetailsComponent, title: 'productdetails' },
    { path: 'categories', component: CategoriesComponent, title: 'categories' },
    { path: 'brands', component: BrandsComponent, title: 'brands' },
    { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent, title: 'wishlist' },
    { path: 'shippingaddress/:id', component: ShippingaddressComponent, title: 'shippingaddress' },
    { path: 'allorders', component: AllordersComponent, title: 'allorders' },
    { path: 'login', component: LoginComponent, title: 'login' },
    { path: 'forgetpassword', component: ForgetpasswordComponent, title: 'forgetpassword' },
    { path: 'register', component: RegisterComponent, title: 'register' },
    { path: '**', component: NotfoundComponent, title: 'notfound' },
];
