import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddAgentModalComponent} from "./add-agent-modal/add-agent-modal.component";
import {AddPortModalComponent} from "./add-port-modal/add-port-modal.component";
import {dia, shapes} from "jointjs"
import {AgentType} from "../../_models/agent-type";
import {GraphService} from "../../_services/graph.service";
import {Agent} from "../../_models/agent";
import {Port} from "../../_models/port";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
  selectedPortId = null

  constructor(
    private modalService: NgbModal,
    private graphService: GraphService
  ) {
  }

  ngOnInit(): void {
    const paper: dia.Paper = new dia.Paper({
      model: this.graphService.graphInstance,
      cellViewNamespace: shapes,
      width: "100%",
      height: "100%",
      gridSize: 20,
      drawGrid: {name: "mesh"},
      async: true,
      sorting: dia.Paper.sorting.APPROX,
      background: {color: "#F3F7F6"},
      defaultLink: () => new shapes.standard.Link(),
      linkPinning: false,

      validateConnection: function (cellViewS, magnetS, cellViewT, magnetT) {
        return magnetT != null && magnetT != magnetS;
      },

    });

    //some test agents
    let port1: Port = new Port('p1', 'right')
    let port2: Port = new Port('p2', 'right')
    let agent1: Agent = new Agent('A', AgentType.PASSIVE, [port1, port2])
    this.graphService.addAgent(agent1)

    let port3: Port = new Port('q1', 'left')
    let port4: Port = new Port('q2', 'left')
    let agent2: Agent = new Agent('B', AgentType.ACTIVE, [port3, port4], 500, 30)
    this.graphService.addAgent(agent2)

    paper.on('cell:pointerclick', (cellView: dia.CellView, event: dia.Event): void => {
      let isPort: boolean = $(event.target).attr('port') != null
      if (this.selectedPortId) {
        this.graphService.changePortColor(this.selectedPortId, '#023047')
      }

      if (isPort) {
        let portId: string = $(event.target).attr('port');
        this.graphService.changePortColor(portId, '#9e2a2b')
        this.selectedPortId = portId
      }
    });

    paper.on('blank:pointerclick', (_: dia.Event): void => {
        this.graphService.hideAllTools(paper)
        if (this.selectedPortId) {
          this.graphService.changePortColor(this.selectedPortId, '#023047')
          this.selectedPortId = null
        }
      }
    )

    paper.on('element:pointerclick', (elementView) => {
      if (!elementView.hasTools()) {
        let toolsView = this.graphService.getElementTools()
        elementView.addTools(toolsView);
      } else {
        elementView.removeTools()
      }
    });

    paper.on('link:mouseenter', (linkView) => {
      let toolsView = this.graphService.getLinkTools()
      linkView.addTools(toolsView);
    });

    paper.on('link:mouseleave', function (linkView) {
      linkView.removeTools();
    });

    document.getElementById("paper").appendChild(paper.el);
  }

  addAgent(type: AgentType): void {
    const modalRef = this.modalService.open(AddAgentModalComponent);
    modalRef.componentInstance.type = type
  }

  addPort(): void {
    this.modalService.open(AddPortModalComponent);
  }

  removePort() {
    if (this.selectedPortId) {
      this.graphService.removePort(this.selectedPortId)
    }
  }

  protected readonly AgentType = AgentType;
}
