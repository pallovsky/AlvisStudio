import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-file-saved-modal',
  templateUrl: './file-saved-modal.component.html',
  styleUrls: ['./file-saved-modal.component.scss']
})
export class FileSavedModalComponent {

  constructor(private modal: NgbActiveModal) {
  }

  onClose(): void {
    this.modal.close()
  }
}
