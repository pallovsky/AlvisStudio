import {Component, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddAgentModalComponent} from "./add-agent-modal/add-agent-modal.component";
import {AddPortModalComponent} from "./add-port-modal/add-port-modal.component";
import {dia, shapes} from "jointjs"
import {DiagramShapes} from "../../_models/diagram-shapes";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
  @Output() graph: dia.Graph
  selectedAgent = null
  selectedPort = null

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.graph = new dia.Graph({}, {cellNamespace: shapes});

    const paper: dia.Paper = new dia.Paper({
      model: this.graph,
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
    });

    //some test agents
    let diagramShapes = new DiagramShapes()
    let agent = diagramShapes.AGENT('passive', 'Agent1')
    let port1 = diagramShapes.PORT('port1', 'left')
    let port2 = diagramShapes.PORT('port2', 'right')
    agent.addPorts([port1, port2])
    agent.addTo(this.graph)

    paper.on('cell:pointerclick', (cellView: dia.CellView, event: dia.Event): void => {
      let isPort: boolean = $(event.target).attr('port') != null
      if (this.selectedAgent) this.selectedAgent.unhighlight()
      if (this.selectedPort) this.changePortColor(this.selectedPort.id, '#023047')

      if (isPort) {
        let portId: string = $(event.target).attr('port');
        this.changePortColor(portId, '#fbb76b')
      } else {
        cellView.highlight()
        this.selectedAgent = cellView;
      }
    });

    paper.on('blank:pointerclick', (_: dia.Event): void => {
        if (this.selectedAgent) {
          this.selectedAgent.unhighlight()
          this.selectedAgent = null
        }
        if (this.selectedPort) {
          this.changePortColor(this.selectedPort.id, '#023047')
          this.selectedPort = null
        }
      }
    )

    document.getElementById("paper").appendChild(paper.el);
  }

  addAgent(type: string): void {
    const modalRef = this.modalService.open(AddAgentModalComponent);
    modalRef.componentInstance.graph = this.graph;
    modalRef.componentInstance.type = type
  }

  addPort(): void {
    const modalRef = this.modalService.open(AddPortModalComponent);
    modalRef.componentInstance.graph = this.graph;
  }

  removeAgent() {
    if (this.selectedAgent) this.selectedAgent.model.remove();
  }

  removePort() {
    if (this.selectedPort) {
      let portId = this.selectedPort.id
      this.graph.getElements().forEach(element => {
        if (element.hasPort(portId)) {
          element.removePort(this.selectedPort)
        }
      })
    }
  }

  changePortColor(portId: string, hex: string): void {
    this.graph.getElements().forEach(element => {
      if (element.hasPort(portId)) {
        element.portProp(portId, 'attrs/portBody/fill', hex)
        this.selectedPort = element.getPort(portId)
      }
    })
  }
}
