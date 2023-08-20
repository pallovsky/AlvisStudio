import {shapes} from "jointjs";

export class DiagramShapes {
  AGENT(type: string, agentName: string): shapes.standard.Rectangle {
    let hex = this.getAgentColor(type)
    return new shapes.standard.Rectangle({
      position: {
        x: 100,
        y: 30
      },
      size: {
        width: 200,
        height: 100
      },
      attrs: {
        body: {
          fill: hex
        },
        label: {
          text: agentName,
          fill: 'black'
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
          args: {y: y}
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
        return 0
      case 'left':
        return 0
      case 'top':
        return -18
      case 'bottom':
        return 18
      default: return 0
    }
  }

  private getAgentColor(type: string): string {
    switch (type) {
      case 'active':
        return '#C2DEDC'
      case 'passive':
        return '#ECE5C7'
      case 'hierarchical':
        return '#CDC2AE'
      default: return 'C2DEDC'
    }
  }
}
