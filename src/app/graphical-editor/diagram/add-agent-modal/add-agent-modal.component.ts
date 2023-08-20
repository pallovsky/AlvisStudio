import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DiagramShapes} from "../../../_models/diagram-shapes";
import {shapes} from "jointjs"
import {AgentType} from "../../../_models/agent-type";

@Component({
  selector: 'app-add-agent-modal',
  templateUrl: './add-agent-modal.component.html',
  styleUrls: ['./add-agent-modal.component.scss']
})
export class AddAgentModalComponent {
  @Input() type: AgentType
  @Input() graph

  constructor(private modal: NgbActiveModal) {}

  diagramShapes: DiagramShapes = new DiagramShapes()
  agentNameForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  onAdd(): void {
    let rect: shapes.standard.Rectangle = this.getAgent();
    rect.addTo(this.graph);
    this.modal.close()
  }

  getAgent(): shapes.standard.Rectangle {
    let agentName: string = this.agentNameForm.value.name
    return this.diagramShapes.AGENT(this.type, agentName)
  }

  onClose(): void {
    this.modal.close()
  }

  get name() {
    return this.agentNameForm.get('name');
  }
}
