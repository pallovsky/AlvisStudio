import {Component, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddAgentModalComponent} from "./add-agent-modal/add-agent-modal.component";
import {AddPortModalComponent} from "./add-port-modal/add-port-modal.component";
import {dia, elementTools, linkTools, shapes} from "jointjs"
import {DiagramShapes} from "../../_models/diagram-shapes";
import {ResizeTool} from "../../_models/resize-tool"
import {AgentType} from "../../_models/agent-type";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
  @Output() graph: dia.Graph
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

      validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
        return magnetT != null;
      },

    });

    //some test agents
    let diagramShapes = new DiagramShapes()
    let agent1 = diagramShapes.AGENT(AgentType.PASSIVE, 'A')
    let port1 = diagramShapes.PORT('p1', 'right')
    let port2 = diagramShapes.PORT('p2', 'right')
    agent1.addPorts([port1, port2])
    agent1.addTo(this.graph)
    let agent2 = diagramShapes.AGENT(AgentType.ACTIVE, 'B')
    let port3 = diagramShapes.PORT('q1', 'left')
    let port4 = diagramShapes.PORT('q2', 'left')
    agent2.position(500, 30)
    agent2.addPorts([port3, port4])
    agent2.addTo(this.graph)



    paper.on('cell:pointerclick', (cellView: dia.CellView, event: dia.Event): void => {
      let isPort: boolean = $(event.target).attr('port') != null
      if (this.selectedPort) this.changePortColor(this.selectedPort.id, '#023047')

      if (isPort) {
        let portId: string = $(event.target).attr('port');
        let boundaryTool = new elementTools.Boundary();
        let removeButton = new elementTools.Remove();
        let toolsView = new dia.ToolsView({
          tools: [
            boundaryTool,
            removeButton,
          ]
        });
        cellView.addTools(toolsView)
        this.changePortColor(portId, '#FF0000')
      }
    });

    paper.on('blank:pointerclick', (_: dia.Event): void => {
        this.graph.getElements().forEach((element) =>
          element.findView(paper).removeTools()
        )
        if (this.selectedPort) {
          this.changePortColor(this.selectedPort.id, '#023047')
          this.selectedPort = null
        }
      }
    )

    paper.on('element:pointerclick', function (elementView) {
      if (!elementView.hasTools()) {
        let boundaryTool = new elementTools.Boundary();
        let removeButton = new elementTools.Remove();
        let resizeTool = new ResizeTool({selector: "body"})

        let toolsView = new dia.ToolsView({
          tools: [
            boundaryTool,
            removeButton,
            resizeTool
          ]
        });

        elementView.addTools(toolsView);
      } else {
        elementView.removeTools()
      }
    });

    paper.on('link:mouseenter', function (linkView) {
      let verticesTool = new linkTools.Vertices();
      let segmentsTool = new linkTools.Segments();
      let sourceArrowheadTool = new linkTools.SourceArrowhead();
      let targetArrowheadTool = new linkTools.TargetArrowhead();
      let sourceAnchorTool = new linkTools.SourceAnchor();
      let targetAnchorTool = new linkTools.TargetAnchor();
      let boundaryTool = new linkTools.Boundary();
      let removeButton = new linkTools.Remove();

      let toolsView = new dia.ToolsView({
        tools: [
          verticesTool, segmentsTool,
          sourceArrowheadTool, targetArrowheadTool,
          sourceAnchorTool, targetAnchorTool,
          boundaryTool, removeButton
        ]
      });

      linkView.addTools(toolsView);
    });

    paper.on('link:mouseleave', function (linkView) {
      linkView.removeTools();
    });

    document.getElementById("paper").appendChild(paper.el);
  }

  addAgent(type: AgentType): void {
    const modalRef = this.modalService.open(AddAgentModalComponent);
    modalRef.componentInstance.graph = this.graph;
    modalRef.componentInstance.type = type
  }

  addPort(): void {
    const modalRef = this.modalService.open(AddPortModalComponent);
    modalRef.componentInstance.graph = this.graph;
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

  protected readonly AgentType = AgentType;
}
