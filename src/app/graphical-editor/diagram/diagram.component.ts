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

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.graph = new dia.Graph({}, {cellNamespace: shapes});

    const paper = new dia.Paper({
      model: this.graph,
      cellViewNamespace: shapes,
      width: "100%",
      height: "100%",
      gridSize: 20,
      drawGrid: {name: "mesh"},
      async: true,
      sorting: dia.Paper.sorting.APPROX,
      background: {color: "#F3F7F6"}
    });
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
}
