import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { integerValidator, NoWhitespaceDirective, passwordMatchValidator, passwordMismatchValidator, strongPasswordValidator } from '../../helper/validators';
import { ValidationErrorService } from '../../services/validation-error.service';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, RouterLink } from '@angular/router';
import { SubmitButtonComponent } from "../shared/submit-button/submit-button.component";
@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SubmitButtonComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  Form: FormGroup;
  atValues: any;
  htmlText: string = '';
  isLoading: boolean = false;
  constructor(private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService, private route: Router) {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.route.navigateByUrl('/home/dashboard')
    this.isLoading = true;
    console.log(this.Form.value);
  }
}
