import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AgentType} from "../../../_models/agent-type";
import {GraphService} from "../../../_services/graph.service";
import {Agent} from "../../../_models/agent";
import {EditorService} from "../../../_services/editor.service";

@Component({
  selector: 'app-add-agent-modal',
  templateUrl: './add-agent-modal.component.html',
  styleUrls: ['./add-agent-modal.component.scss']
})
export class AddAgentModalComponent {
  @Input() type: AgentType

  constructor(
    private modal: NgbActiveModal,
    private graphService: GraphService,
    private editorService: EditorService,
  ) {
  }

  agentNameForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  onAdd(): void {
    let agentName: string = this.agentNameForm.value.name
    let agent: Agent = new Agent(agentName, this.type)
    this.graphService.addAgent(agent)
    this.editorService.addAgent(agentName)
    this.modal.close()
  }

  onClose(): void {
    this.modal.close()
  }

  get name() {
    return this.agentNameForm.get('name');
  }
}
