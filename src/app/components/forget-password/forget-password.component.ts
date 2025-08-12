import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SubmitButtonComponent } from '../shared/submit-button/submit-button.component';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SubmitButtonComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  Form: FormGroup;
  atValues: any;
  htmlText: string = '';
  isLoading: boolean = false;
  constructor(private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService,
    private service: CommonService, private route: Router
  ) {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.Form.markAllAsTouched()
    if (this.Form.valid) {
      this.isLoading = true
      const formURlData = new URLSearchParams()
      formURlData.set('email', this.Form.value.email)
      this.service
        .post('user/forgot-password', formURlData.toString())
        .subscribe({
          next: (resp: any) => {
            if (resp.success == true) {
              this.isLoading = false;
              this.toastr.success(resp.message);
              // this.route.navigateByUrl('/reset-password');
              this.route.navigate(['/reset-password'], {
                queryParams: { email: this.Form.value.email }
              });
            } else {
              this.isLoading = false;
              this.toastr.warning(resp.message);
            }
          },
          error: (error: any) => {
            this.isLoading = false;
            this.toastr.warning(error || 'Something went wrong!');
          }
        })
    }
  }


}
