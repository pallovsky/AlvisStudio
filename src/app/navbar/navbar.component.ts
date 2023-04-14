import { Component } from '@angular/core';
import {NavbarData} from "../_models/navbar-data";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navbarData: NavbarData = new NavbarData()
}
