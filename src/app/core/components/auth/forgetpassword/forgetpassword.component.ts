import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ResetcodeComponent } from '../resetcode/resetcode.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, ResetcodeComponent, TranslatePipe],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {

  private authService: AuthService = inject(AuthService);

  // errMsg!:string;
  errMsg: WritableSignal<string> = signal<string>('');
  // isLoading : boolean = false;
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  forgetPasswordFlag: boolean = true;
  resetCodeFlag: boolean = false;

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });  //} ,{updateOn:'blur'}) ,{updateOn:'submit'}) ,{updateOn:'change'})

  submitforgetPasswordForm() {
    if (this.forgetPasswordForm.valid) {

      this.isLoading.set(true);
      this.authService.forgetpassword(this.forgetPasswordForm.value).subscribe({
        next: res => {
          console.log(res);
          // console.log( this.forgetPasswordForm );
          this.isLoading.set(false);
          // hide forget Password form
          this.forgetPasswordFlag = false;
          // display reset Code form
          this.resetCodeFlag = true;
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
