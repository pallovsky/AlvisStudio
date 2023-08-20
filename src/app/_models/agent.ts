import {AgentType} from "./agent-type";
import {Port} from "./port";

export class Agent {
  name: string
  type: AgentType
  ports: Port[] = []
  x: number = 100
  y: number = 30

  constructor(name: string, type: AgentType, ports: Port[] = [], x: number = 100, y: number = 30) {
    this.name = name
    this.type = type
    this.ports = ports
    this.x = x
    this.y = y
  }
}
