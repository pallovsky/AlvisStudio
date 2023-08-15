import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DiagramShapes} from "../../../_models/diagram-shapes";
import {shapes} from "jointjs"

@Component({
  selector: 'app-add-agent-modal',
  templateUrl: './add-agent-modal.component.html',
  styleUrls: ['./add-agent-modal.component.scss']
})
export class AddAgentModalComponent {
  @Input() type: string
  @Input() graph

  constructor(private modal: NgbActiveModal) {}

  diagramShapes: DiagramShapes = new DiagramShapes()
  agentNameForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  onAdd(): void {
    let rect = new shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(200, 100);
    // @ts-ignore
    rect.attr(this.getAttributes());
    rect.addTo(this.graph);
    this.modal.close()
  }

  getAttributes(): object {
    let agentName: string = this.agentNameForm.value.name
    switch (this.type) {
      case 'active':
        return this.diagramShapes.ACTIVE_AGENT(agentName);
      case 'passive':
        return this.diagramShapes.PASSIVE_AGENT(agentName);
      case 'hierarchical':
        return this.diagramShapes.HIERARCHICAL_AGENT(agentName);
      default:
        return {}
    }
  }

  onClose(): void {
    this.modal.close()
  }

  get name() {
    return this.agentNameForm.get('name');
  }
}
