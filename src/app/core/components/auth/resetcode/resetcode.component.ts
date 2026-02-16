import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ResetnewpasswordComponent } from '../resetnewpassword/resetnewpassword.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-resetcode',
  imports: [ReactiveFormsModule, ResetnewpasswordComponent, TranslatePipe],
  templateUrl: './resetcode.component.html',
  styleUrl: './resetcode.component.scss',
})
export class ResetcodeComponent {

  private authService: AuthService = inject(AuthService);

  // errMsg!:string;
  errMsg: WritableSignal<string> = signal<string>('');
  // isLoading : boolean = false;
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  resetNewPasswordFlag: boolean = false;
  resetCodeFlag: boolean = true;

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{4,}$/)]),
  });  //} ,{updateOn:'blur'}) ,{updateOn:'submit'}) ,{updateOn:'change'})

  submitresetCodeForm() {
    if (this.resetCodeForm.valid) {

      this.isLoading.set(true);
      this.authService.verifyResetCode(this.resetCodeForm.value).subscribe({
        next: res => {
          console.log(res);
          // console.log( this.resetCodeForm );
          this.isLoading.set(false);
          // hide resetcode form 
          this.resetCodeFlag = false;
          // display reset new password form
          this.resetNewPasswordFlag = true;
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
