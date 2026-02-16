import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {


  private authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  // errMsg!:string;
  errMsg: WritableSignal<string> = signal<string>('');
  // isLoading : boolean = false;
  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  logInForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/)]),

  });  //} ,{updateOn:'blur'}) ,{updateOn:'submit'}) ,{updateOn:'change'})

  submitlogInForm() {
    if (this.logInForm.valid) {
      this.isLoading.set(true);

      this.authService.logIn(this.logInForm.value).subscribe({
        next: res => {
          console.log(res);
          // console.log( this.logInForm );
          this.isLoading.set(false);
          //token : data >>> jwt : json web token
          localStorage.setItem('userToken', res.token);
          this.authService.decodeUserData();
          //navigate home page : routing : prog routing
          this._router.navigate(['home']);
        },
        error: err => {
          this.errMsg.set(err.error.message)
          console.log(this.errMsg);//err.error.message
          this.isLoading.set(false);
        }
      })

    }
  }

}
