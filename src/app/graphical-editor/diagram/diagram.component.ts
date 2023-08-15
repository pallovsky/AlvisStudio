import {Component, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddAgentModalComponent} from "./add-agent-modal/add-agent-modal.component";
import {AddPortModalComponent} from "./add-port-modal/add-port-modal.component";
import {dia, shapes} from "jointjs"

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

    paper.on('cell:pointerdown', (cellView: dia.CellView): void => {
      if (this.selectedAgent) this.selectedAgent.unhighlight()
      if (this.selectedPort) this.selectedPort.unhighlight()
      cellView.highlight()
      this.selectedAgent = cellView;
    });

    paper.on('blank:pointerdown', (_: dia.Event): void => {
        if (this.selectedAgent) {
          this.selectedAgent.unhighlight()
          this.selectedAgent = null
        }
        if (this.selectedPort) {
          this.selectedPort.unhighlight()
          this.selectedPort = null
        }
      }
    )

    paper.on('element:magnet:pointerdown', (elementView: dia.ElementView, event: dia.Event, magnet: SVGElement): void => {
      elementView.highlight()
      console.log(elementView)
    })

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
    if (this.selectedPort) this.selectedPort.model.remove();
  }
}
