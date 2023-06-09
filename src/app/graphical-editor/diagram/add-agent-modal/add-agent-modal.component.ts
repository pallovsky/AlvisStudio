import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

const joint = require('../../../../../node_modules/jointjs/dist/joint.js');

@Component({
  selector: 'app-add-agent-modal',
  templateUrl: './add-agent-modal.component.html',
  styleUrls: ['./add-agent-modal.component.scss']
})
export class AddAgentModalComponent {
  @Input() type: string
  @Input() graph

  constructor(private modal: NgbActiveModal) {}

  agentNameForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  onAdd(): void {
    let rect = new joint.shapes.standard.Rectangle();

    rect.position(100, 30);
    rect.resize(150, 60);
    rect.attr(this.getAttributes());
    rect.addTo(this.graph);
    this.modal.close()
  }

  getAttributes(): object {
    let agentName: string = this.agentNameForm.value.name
    switch (this.type) {
      case 'active':
        return {
          body: {
            fill: '#C2DEDC'
          },
          label: {
            text: agentName,
            fill: 'white'
          }
        };
      case 'passive':
        return {
          body: {
            fill: '#ECE5C7'
          },
          label: {
            text: agentName,
            fill: 'white'
          }
        }
      case 'hierarchical':
        return {
          body: {
            fill: '#CDC2AE'
          },
          label: {
            text: agentName,
            fill: 'white'
          }
        }
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
