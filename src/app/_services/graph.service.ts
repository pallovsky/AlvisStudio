import {Injectable} from '@angular/core';
import {dia, elementTools, linkTools, shapes} from "jointjs";
import {DiagramShapes} from "../_models/diagram-shapes";
import {Agent} from "../_models/agent";
import {Port} from "../_models/port";
import {ResizeTool} from "../_models/resize-tool";

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private graph: dia.Graph = new dia.Graph({}, {cellNamespace: shapes});
  private diagramShapes: DiagramShapes = new DiagramShapes()

  constructor() { }

  addAgent(agent: Agent) {
    let newAgent = this.diagramShapes.AGENT(agent.type, agent.name, agent.width, agent.height)
    let ports = agent.ports.map((port: Port) => this.diagramShapes.PORT(port.name, port.position))
    newAgent.addPorts(ports)
    newAgent.addTo(this.graph)
  }

  addPort(port: Port, agentName: string) {
    let newPort: object = this.diagramShapes.PORT(port.name, port.position)
    this.graph.getElements().forEach(element => {
      if (element.attributes.attrs['label'].text == agentName) {
        element.addPort(newPort)
      }
    })
  }

  removePort(selectedPortId: any) {
    this.graph.getElements().forEach(element => {
      if (element.hasPort(selectedPortId)) {
        element.removePort(selectedPortId)
      }
    })
  }

  changePortColor(portId: string, hex: string): void {
    this.graph.getElements().forEach(element => {
      if (element.hasPort(portId)) {
        element.portProp(portId, 'attrs/portBody/fill', hex)
      }
    })
  }

  getAgentNames(): string[] {
    return this.graph.getElements().map(element => element.attributes.attrs['label'].text)
  }

  getElementTools() {
    let boundaryTool = new elementTools.Boundary();
    let removeButton = new elementTools.Remove();
    let resizeTool = new ResizeTool({selector: "body"})

    return new dia.ToolsView({
      tools: [
        boundaryTool,
        removeButton,
        resizeTool
      ]
    });
  }

  getLinkTools() {
    let verticesTool = new linkTools.Vertices();
    let segmentsTool = new linkTools.Segments();
    let sourceAnchorTool = new linkTools.SourceAnchor();
    let targetAnchorTool = new linkTools.TargetAnchor();
    let boundaryTool = new linkTools.Boundary();
    let removeButton = new linkTools.Remove();

    return new dia.ToolsView({
      tools: [
        verticesTool, segmentsTool,
        sourceAnchorTool, targetAnchorTool,
        boundaryTool, removeButton
      ]
    });
  }

  hideAllTools(paper: dia.Paper) {
    this.graph.getElements().forEach((element) =>
      element.findView(paper).removeTools()
    )
  }

  get graphInstance() {
    return this.graph
  }
}
