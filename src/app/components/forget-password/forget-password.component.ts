import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubmitButtonComponent } from '../shared/submit-button/submit-button.component';

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
  constructor(private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService) {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    this.isLoading = true;
    console.log(this.Form.value);
  }
}
