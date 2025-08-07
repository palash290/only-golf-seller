import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  businessLogoUrl: string = '';
  name: any;
  email: any;

  constructor(private toastr: NzMessageService, private route: Router,
    private service: CommonService
  ) {
    this.getDetails();
  }

  getDetails() {
    this.service.get('seller/seller-profile').subscribe({
      next: (resp: any) => {
        this.name = resp.data.full_name,
        this.email = resp.data.email,
          this.businessLogoUrl = resp.data.profile_image;
      },
      error: (error) => {
        this.toastr.warning(error || 'Something went wrong!');
      }
    });
  }

  
}
