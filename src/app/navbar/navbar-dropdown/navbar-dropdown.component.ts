import {Component, Input} from '@angular/core';
import {DropdownData} from "../../_models/navbar-data";

@Component({
  selector: 'app-navbar-dropdown',
  templateUrl: './navbar-dropdown.component.html',
  styleUrls: ['./navbar-dropdown.component.scss']
})
export class NavbarDropdownComponent {
  @Input() data: DropdownData = DropdownData.empty()

  isLastRow(index: number): boolean {
    return index != this.data.dividedOptions.length - 1
  }

  onMenuClick(option: string) {
    console.log(option)
  }
}
