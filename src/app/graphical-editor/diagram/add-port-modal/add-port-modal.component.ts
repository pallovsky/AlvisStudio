import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {dia} from "jointjs"
import * as _ from 'lodash';

@Component({
  selector: 'app-add-port-modal',
  templateUrl: './add-port-modal.component.html',
  styleUrls: ['./add-port-modal.component.scss']
})
export class AddPortModalComponent implements OnInit {
  @Input() graph: dia.Graph
  elementsByName
  agentNames: string[] = []
  portForm = new FormGroup({
    agentName: new FormControl('', [Validators.required]),
  });

  constructor(private modal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.elementsByName = _.groupBy(this.graph.getElements(), element => element.attributes.attrs['label'].text);
    this.agentNames = Object.keys(this.elementsByName)
  }

  addPort(): void {
    let agentName: string = this.portForm.value.agentName
    let element = this.elementsByName[agentName]
    this.modal.close()
  }

  onAdd(): void {
    this.modal.close()
  }

  onClose() {
    this.modal.close()
  }

}
