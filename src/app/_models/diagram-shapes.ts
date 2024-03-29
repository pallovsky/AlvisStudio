import {shapes} from "jointjs";
import {AgentType} from "./agent-type";

export class DiagramShapes {
  AGENT(type: AgentType, agentName: string, width: number = 200, height: number = 100): shapes.standard.Rectangle {
    let hex = this.getAgentColor(type)
    let shape = new shapes.standard.Rectangle({
      position: {
        x: 100,
        y: 30
      },
      size: {
        width: width,
        height: height
      },
      attrs: {
        body: {
          fill: hex
        },
        label: {
          text: agentName,
          fill: 'white'
        }
      },
      ports: {
        groups: {
          'left': this.PORT_GROUP('left'),
          'right': this.PORT_GROUP('right'),
          'top': this.PORT_GROUP('top'),
          'bottom': this.PORT_GROUP('bottom'),
        }
      }
    })
    if (type == AgentType.ACTIVE) {
      // rounding corners
      shape.attr({
        body: {
          rx: 10,
          ry: 10,
          fill: hex
        },
        label: {
          text: agentName,
          fill: 'white'
        }
      });
    }
    return shape;
  }

  PORT(portName: string, position: string): object {
    return {
      group: position,
      attrs: {label: {text: portName}}
    }
  }

  PORT_GROUP(position: string): object {
    let y: number = this.getPortYAxis(position)
    return {
      position: {
        name: position
      },
      attrs: {
        portBody: {
          magnet: true,
          r: 10,
          fill: '#023047',
          stroke: '#023047'
        }
      },
      label: {
        position: {
          name: position,
          args: {
            y: y
          }
        },
        markup: [{
          tagName: 'text',
          selector: 'label',
          className: 'label-text'
        }]
      },
      markup: [{
        tagName: 'circle',
        selector: 'portBody'
      }]
    };
  }

  private getPortYAxis(position: string): number {
    switch (position) {
      case 'right':
        return -12
      case 'left':
        return -12
      case 'top':
        return -18
      case 'bottom':
        return 18
      default:
        return 0
    }
  }

  private getAgentColor(type: AgentType): string {
    switch (type) {
      case AgentType.ACTIVE:
          return '#0b3954'
      case AgentType.PASSIVE:
        return '#087e8b'
    }
  }
}
