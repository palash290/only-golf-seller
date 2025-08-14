import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error.service';

@Component({
  selector: 'app-my-profile',
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  //businessLogoUrl: string = '';
  name: any;
  email: any;
  Form: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private toastr: NzMessageService, private route: Router,
    private service: CommonService, public validationErrorService: ValidationErrorService
  ) {
    this.getDetails();
    this.Form = this.fb.group({
      name: [' ', [Validators.required]],
      email: [{ value: ' ', disabled: true }],
    });
  }

  // getDetails() {
  //   this.service.get('seller/seller-profile').subscribe({
  //     next: (resp: any) => {
  //       this.name = resp.data.full_name,
  //         this.email = resp.data.email,
  //         this.businessLogoUrl = resp.data.profile_image;
  //     },
  //     error: (error) => {
  //       this.toastr.warning(error || 'Something went wrong!');
  //     }
  //   });
  // }

  getDetails() {
    this.service.get('seller/seller-profile').subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.Form.patchValue({
            name: resp.data.full_name,
            email: resp.data.email,
          });
          this.name = resp.data.full_name;
          this.profile_image = resp.data.profile_image;
        } else {
          this.isLoading = false;
          this.toastr.warning(resp.message);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.warning(error || 'Something went wrong!');
      }
    });
  }

  profile_image: any = ''; // Will be used for preview
  selectedLogoFile: File | null = null; // For uploading in FormData

  onLogoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedLogoFile = file;

      // For image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.profile_image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  submitDetails() {
    const trimmedMessage = this.Form.value.name.trim();
    if (trimmedMessage === '') {
      //this.isDisabled = false;
      return;
    }
    this.Form.markAllAsTouched();
    this.isLoading = true;
    const formData = new FormData();

    formData.append('full_name', this.Form.value.name);

    // Append image file if selected
    if (this.selectedLogoFile) {
      formData.append('profile_image', this.selectedLogoFile);
    }

    this.service.post('seller/update-profile', formData).subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.isLoading = false;
          this.toastr.success(resp.message);
          this.service.triggerRefresh();
        } else {
          this.isLoading = false;
          this.toastr.warning(resp.message);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.warning(error || 'Something went wrong!');
      }
    });
  }


}
