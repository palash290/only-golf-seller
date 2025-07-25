import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { HeaderComponent } from "../shared/header/header.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
