import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  private authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  // errMsg!:string;
  errMsg: WritableSignal<string> = signal<string>('');
  // isLoading : boolean = false;
  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  registerForm: FormGroup = new FormGroup({

    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  }, [this.passwordMatchValidator]);  //} ,{updateOn:'blur'}) ,{updateOn:'submit'}) ,{updateOn:'change'})

  submitRegisterForm() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);

      this.authService.signUp(this.registerForm.value).subscribe({
        next: res => {
          console.log(res);
          // console.log( this.registerForm );
          this.isLoading.set(false);
          //token : data >>> jwt : json web token : jwt decode عشان افك التشفير
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

  // في حال customValidator لازم AbstractControl
  passwordMatchValidator(x: AbstractControl) {

    if (x.get('password')?.value === x.get('rePassword')?.value) {
      return null;
    } else {
      x.get('rePassword')?.setErrors({ mismatch: true })
      return { mismatch: true }
    }

  }

  // في حال customValidator لازم AbstractControl
  // repasswordMatchValidator(y:AbstractControl){

  //   if(y.get('password')?.value === y.get('rePassword')?.value){
  //     return null;
  //   }else{
  //     y.get('rePassword')?.setErrors({XMissmatch: true});
  //     return {XMissmatch: true}
  //   }

  // }

}
