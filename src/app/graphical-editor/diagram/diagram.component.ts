import {Component, OnInit, Output} from '@angular/core';

const joint = require('../../../../node_modules/jointjs/dist/joint.js');

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
  @Output() graph = null

  ngOnInit(): void {
    const {dia, shapes} = joint;
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
    // const modalRef = this.modalService.open(ModalContentComponent);
    // modalRef.componentInstance.user = this.user;
  }

  addActiveAgent() {
    let rect = new joint.shapes.standard.Ellipse();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
      body: {
        fill: '#C2DEDC'
      },
      label: {
        text: 'Active',
        fill: 'white'
      }
    });
    rect.addTo(this.graph);
  }

  addPassiveAgent() {
    let rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
      body: {
        fill: '#ECE5C7'
      },
      label: {
        text: 'Passive',
        fill: 'white'
      }
    });
    rect.addTo(this.graph);
  }

  addHierarchicalAgent() {
    let rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
      body: {
        fill: '#CDC2AE'
      },
      label: {
        text: 'Hierarchical',
        fill: 'white'
      }
    });
    rect.addTo(this.graph);
  }
}
