import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectData} from "../../_models/project-data";

@Component({
  selector: 'app-project-name-modal',
  templateUrl: './project-name-modal.component.html',
  styleUrls: ['./project-name-modal.component.scss']
})
export class ProjectNameModalComponent {
  @Input() currentProjectData: ProjectData

  constructor(private modal: NgbActiveModal,) {
  }

  projectNameForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  onSave(): void {
    this.currentProjectData.name = this.projectNameForm.value.name
    localStorage.setItem('project-data', JSON.stringify(this.currentProjectData))
    this.modal.close()
  }

  onClose(): void {
    this.modal.close()
  }

  get name() {
    return this.projectNameForm.get('name');
  }
}
