import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @ViewChild('closeModal') closeModal!: ElementRef;
  name: any;
  businessLogoUrl: string = '';

  constructor(private service: AuthService, private commonService: CommonService) {
    this.getDetails();
  }

  logout() {
    this.service.logout()
    this.closeModal.nativeElement.click();
  }

  getDetails() {
    this.commonService.get('seller/seller-profile').subscribe({
      next: (resp: any) => {
        this.name = resp.data.full_name,
          this.businessLogoUrl = resp.data.profile_image;
      },
      error: (error) => {
        //this.toastr.warning(error || 'Something went wrong!');
      }
    });
  }

  @Output() toggleEvent = new EventEmitter<boolean>();

  toggleMenu() {
    this.toggleEvent.emit(true);
  }


}
