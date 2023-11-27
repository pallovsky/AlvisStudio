import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddAgentModalComponent} from "./add-agent-modal/add-agent-modal.component";
import {AddPortModalComponent} from "./add-port-modal/add-port-modal.component";
import {dia, shapes} from "jointjs"
import {AgentType} from "../../_models/agent-type";
import {GraphService} from "../../_services/graph.service";
import {Agent} from "../../_models/agent";
import {Port} from "../../_models/port";
import {ExportService} from "../../_services/export.service";
import {ProjectData} from "../../_models/project-data";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
  selectedPortId = null

  constructor(
    private modalService: NgbModal,
    private graphService: GraphService,
    private exportService: ExportService,
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

    // Loading graph if project exists
    let currentProjectExist: boolean = localStorage.getItem('project-data') != null
    if (currentProjectExist) {
      let projectData: ProjectData = JSON.parse(localStorage.getItem('project-data')) as ProjectData
      this.graphService.graphInstance.fromJSON(projectData.graph)
    }

    // Marking a port with left pointer click in order to delete it.
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

    // Un-marking selected port.
    paper.on('blank:pointerclick', (_: dia.Event): void => {
        this.graphService.hideAllTools(paper)
        if (this.selectedPortId) {
          this.graphService.changePortColor(this.selectedPortId, '#023047')
          this.selectedPortId = null
        }
      }
    )

    // Creating double-edged link if link already exist between two ports
    paper.on("link:connect", (linkView: dia.LinkView): void => {
      const source = linkView.model.get('source');
      const target = linkView.model.get('target');
      const links: dia.Link[] = this.graphService.graphInstance.getLinks()
      const existingLinks: dia.Link[] = links.filter((link: dia.Link) => {
        return (link.target().port == source.port && link.source().port == target.port) ||
          (link.source().port == source.port && link.target().port == target.port)
      })
      const linkExist: boolean = existingLinks.length == 2

      if (linkExist) {
        existingLinks.forEach((link: dia.Link) => {
          link.remove()
        })
        let doubleWayLink = new shapes.standard.Link();
        doubleWayLink.source(source);
        doubleWayLink.target(target);
        doubleWayLink.attr({
          line: {
            strokeWidth: 2,
            sourceMarker: {
              'type': 'path',
              'stroke': 'black',
              'fill': 'black',
              'd': 'M 10 -5 0 0 10 5 Z'
            },
            targetMarker: {
              'type': 'path',
              'stroke': 'black',
              'fill': 'black',
              'd': 'M 10 -5 0 0 10 5 Z'
            }
          }
        });
        doubleWayLink.addTo(this.graphService.graphInstance)
      }
    });

    // Adding tools on element click.
    paper.on('element:pointerclick', (elementView) => {
      if (!elementView.hasTools()) {
        this.graphService.hideAllTools(paper)
        let toolsView = this.graphService.getElementTools()
        elementView.addTools(toolsView);
      } else {
        elementView.removeTools()
      }
    });

    // Adding tools on link mouse hover.
    paper.on('link:mouseenter', (linkView) => {
      let toolsView = this.graphService.getLinkTools()
      linkView.addTools(toolsView);
    });

    // Removing tools on mouse leaving link area.
    paper.on('link:mouseleave', function (linkView) {
      linkView.removeTools();
    });

    this.exportService.paper = paper
    document.getElementById("paper").appendChild(paper.el);
  }

  addAgent(type: AgentType): void {
    const modalRef = this.modalService.open(AddAgentModalComponent);
    modalRef.componentInstance.type = type
  }

  addPort(): void {
    this.modalService.open(AddPortModalComponent);
  }

  removePort(): void {
    if (this.selectedPortId) {
      this.graphService.removePort(this.selectedPortId)
    }
  }

  protected readonly AgentType = AgentType;
}
