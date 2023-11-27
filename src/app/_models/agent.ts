import {AgentType} from "./agent-type";
import {Port} from "./port";

export class Agent {
  name: string
  type: AgentType
  ports: Port[] = []
  width: number = 100
  height: number = 30

  constructor(name: string, type: AgentType, ports: Port[] = [], width: number = 200, height: number = 100) {
    this.name = name
    this.type = type
    this.ports = ports
    this.width = width
    this.height = height
  }
}
