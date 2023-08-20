import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DiagramShapes} from "../../../_models/diagram-shapes";
import {GraphService} from "../../../_services/graph.service";
import {Port} from "../../../_models/port";

@Component({
  selector: 'app-add-port-modal',
  templateUrl: './add-port-modal.component.html',
  styleUrls: ['./add-port-modal.component.scss']
})
export class AddPortModalComponent implements OnInit {
  agentNames: string[] = []
  positions: string[] = ['left', 'right', 'top', 'bottom']
  diagramShapes: DiagramShapes = new DiagramShapes()

  portForm: FormGroup = new FormGroup({
    position : new FormControl('', [Validators.required]),
    portName: new FormControl('', [Validators.required]),
    agentName: new FormControl('', [Validators.required]),
  });

  constructor(
    private modal: NgbActiveModal,
    private graphService: GraphService,
  ) {}

  ngOnInit(): void {
    this.agentNames = this.graphService.getAgentNames()
  }

  onAdd(): void {
    let agentName: string = this.portForm.value.agentName
    let port: Port = new Port(this.portForm.value.portName, this.portForm.value.position)
    this.graphService.addPort(port, agentName)
    this.modal.close()
  }

  onClose(): void {
    this.modal.close()
  }

  get portName() {
    return this.portForm.get('portName');
  }
}
