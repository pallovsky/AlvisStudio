import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {dia} from "jointjs"
import {DiagramShapes} from "../../../_models/diagram-shapes";

@Component({
  selector: 'app-add-port-modal',
  templateUrl: './add-port-modal.component.html',
  styleUrls: ['./add-port-modal.component.scss']
})
export class AddPortModalComponent implements OnInit {
  @Input() graph: dia.Graph

  agentNames: string[] = []
  positions: string[] = ['left', 'right', 'top', 'bottom']
  diagramShapes: DiagramShapes = new DiagramShapes()

  portForm: FormGroup = new FormGroup({
    position : new FormControl('', [Validators.required]),
    portName: new FormControl('', [Validators.required]),
    agentName: new FormControl('', [Validators.required]),
  });

  constructor(private modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.agentNames = this.graph.getElements().map(element => element.attributes.attrs['label'].text)
  }

  onAdd(): void {
    let agentName: string = this.portForm.value.agentName
    let portName: string = this.portForm.value.portName
    let position: string = this.portForm.value.position

    let port: object = this.diagramShapes.PORT(portName, position)
    this.graph.getElements().forEach(element => {
      if (element.attributes.attrs['label'].text == agentName) {
        element.addPort(port)
      }
    })

    this.modal.close()
  }

  onClose(): void {
    this.modal.close()
  }

  get portName() {
    return this.portForm.get('portName');
  }
}
