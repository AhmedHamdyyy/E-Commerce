import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-resetnewpassword',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './resetnewpassword.component.html',
  styleUrl: './resetnewpassword.component.scss',
})
export class ResetnewpasswordComponent {


  private authService: AuthService = inject(AuthService);
  _router: Router = inject(Router);

  // errMsg!:string;
  errMsg: WritableSignal<string> = signal<string>('');
  // isLoading : boolean = false;
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  resetNewPasswordFlag: boolean = false;

  resetNewPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/)]),
  });  //} ,{updateOn:'blur'}) ,{updateOn:'submit'}) ,{updateOn:'change'})

  submitresetNewPasswordForm() {
    if (this.resetNewPasswordForm.valid) {

      this.isLoading.set(true);
      this.authService.resetNewPassword(this.resetNewPasswordForm.value).subscribe({
        next: res => {
          console.log(res);
          // console.log( this.resetCodeForm );
          this.isLoading.set(false);
          localStorage.setItem('userToken', res.token);
          this.authService.decodeUserData();
          this._router.navigate(['home'])
        },
        error: err => {
          this.errMsg.set(err.error.message)
          console.log(this.errMsg());//err.error.message
          this.isLoading.set(false);
        }
      })

    }
  }

}
