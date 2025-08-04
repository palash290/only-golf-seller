import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmitButtonComponent } from '../shared/submit-button/submit-button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ValidationErrorService } from '../../services/validation-error.service';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SubmitButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  Form: FormGroup;
  atValues: any;
  htmlText: string = '';
  isLoading: boolean = false;
  isLoadingResend: boolean = false;
  isPasswordVisible: boolean = false;
  userEmail: any;

  constructor(private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService,
    private service: CommonService, private route: Router, private router: ActivatedRoute
  ) {
    this.Form = this.fb.group({
      //email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      const email = params['email'];
      console.log("Received email:", email);

      // Optionally store it in a variable
      this.userEmail = email;
    });
  }


  onSubmit() {
    this.Form.markAllAsTouched()
    if (this.Form.valid) {
      this.isLoading = true
      const formURlData = new URLSearchParams()
      formURlData.set('email', this.userEmail)
      formURlData.set('otp', this.Form.value.otp)
      formURlData.set('newPassword', this.Form.value.password)
      this.service
        .post('user/reset-password', formURlData.toString())
        .subscribe({
          next: (resp: any) => {
            if (resp.success == true) {
              this.isLoading = false;
              this.toastr.success(resp.message);
              this.route.navigateByUrl('/')
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

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  resendOtp() {
    this.Form.markAllAsTouched()
    if (this.Form.valid) {
      this.isLoadingResend = true
      const formURlData = new URLSearchParams()
      formURlData.set('email', this.userEmail)
      this.service
        .post('user/resend-otp', formURlData.toString())
        .subscribe({
          next: (resp: any) => {
            if (resp.success == true) {
              this.isLoadingResend = false;
              this.toastr.success(resp.message);
            } else {
              this.isLoadingResend = false;
              this.toastr.warning(resp.message);
            }
          },
          error: (error: any) => {
            this.isLoadingResend = false;
            this.toastr.warning(error || 'Something went wrong!');
          }
        })
    }
  }


}
