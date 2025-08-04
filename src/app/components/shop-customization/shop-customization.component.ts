import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-customization',
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './shop-customization.component.html',
  styleUrl: './shop-customization.component.css'
})
export class ShopCustomizationComponent {

  Form: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService, private route: Router,
    private service: CommonService
  ) {
    this.getDetails();
    this.Form = this.fb.group({
      name: [{ value: ' ', disabled: true }],
      phone: [' ', [Validators.required]],
      email: [{ value: ' ', disabled: true }],
      houseNo: [' ', [Validators.required]],
      landmark: [' ', [Validators.required]],
      state: [' ', [Validators.required]],
      city: [' ', [Validators.required]],
      location: [' ', [Validators.required]],
      pinCode: [' ', [Validators.required]],
      businessName: [' ', [Validators.required]],
      businessEIN: [' ', [Validators.required]],
      businessDescription: [' '],
      bankHolderName: [' ', [Validators.required]],
      bankName: [' ', [Validators.required]],
      accountNumber: [' ', [Validators.required]],
      routingNumber: [' ', [Validators.required]],
      swiftCode: [' ', [Validators.required]],
      iban: [' ', [Validators.required]]
    });

  }

  getDetails() {
    // const formURlData = new URLSearchParams();
    // formURlData.set('amount', amount);
    this.service.get('seller/seller-profile').subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.Form.patchValue({
            name: resp.data.full_name,
            phone: resp.data.phone_number,
            email: resp.data.email,
            houseNo: resp.data.business_address,
            landmark: resp.data.business_landmark,
            state: resp.data.business_state,
            city: resp.data.business_city,
            location: resp.data.business_address,
            pinCode: resp.data.business_pincode,
            businessName: resp.data.business_name,
            businessEIN: resp.data.business_ein,
            businessDescription: resp.data.business_description,
            bankHolderName: resp.data.holder_name,
            bankName: resp.data.bank_name,
            accountNumber: resp.data.account_number,
            routingNumber: resp.data.routing_number,
            swiftCode: resp.data.swift_code,
            iban: resp.data.iban
          });
          this.businessLogoUrl = resp.data.business_logo;
        } else {
          this.isLoading = false;
          this.toastr.warning(resp.message);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.warning(error.error?.message || 'Something went wrong!');
      }
    });
  }

  businessLogoUrl: any = ''; // Will be used for preview
  selectedLogoFile: File | null = null; // For uploading in FormData

  onLogoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedLogoFile = file;

      // For image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.businessLogoUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  submitDetails() {
    this.isLoading = true;
    const formData = new FormData();

    formData.append('business_name', this.Form.value.businessName);
    formData.append('business_ein', this.Form.value.businessEIN);
    formData.append('business_address', this.Form.value.houseNo);
    formData.append('business_landmark', this.Form.value.landmark);
    formData.append('business_state', this.Form.value.state);
    formData.append('business_city', this.Form.value.city);
    formData.append('business_pincode', this.Form.value.pinCode);
    formData.append('business_description', this.Form.value.businessDescription);
    formData.append('holder_name', this.Form.value.bankHolderName);
    formData.append('bank_name', this.Form.value.bankName);
    formData.append('account_number', this.Form.value.accountNumber);
    formData.append('routing_number', this.Form.value.routingNumber);
    formData.append('swift_code', this.Form.value.swiftCode);
    formData.append('iban', this.Form.value.iban);
    formData.append('phone_number', this.Form.value.phone);

    // Append image file if selected
    if (this.selectedLogoFile) {
      formData.append('business_logo', this.selectedLogoFile);
    }

    this.service.post('seller/update-seller-profile', formData).subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.isLoading = false;
          this.toastr.success(resp.message);
        } else {
          this.isLoading = false;
          this.toastr.warning(resp.message);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.warning(error.error?.message || 'Something went wrong!');
      }
    });
  }


}
