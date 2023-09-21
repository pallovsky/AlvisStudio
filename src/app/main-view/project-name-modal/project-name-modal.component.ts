import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectData} from "../../_models/project-data";
import {FileSaverService} from "ngx-filesaver";

@Component({
  selector: 'app-project-name-modal',
  templateUrl: './project-name-modal.component.html',
  styleUrls: ['./project-name-modal.component.scss']
})
export class ProjectNameModalComponent {
  @Input() currentProjectData: ProjectData

  constructor(
    private modal: NgbActiveModal,
    private fileSaver: FileSaverService,
  ) {
  }

  projectNameForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  onSave(): void {
    let newProjectName: string = this.projectNameForm.value.name
    let blob: Blob = new Blob([JSON.stringify(this.currentProjectData)], { type: 'text/plain;charset=utf-8' })
    this.fileSaver.save(blob, newProjectName + '.json');
    this.modal.close()
  }

  onClose(): void {
    this.modal.close()
  }

  get name() {
    return this.projectNameForm.get('name');
  }
}
