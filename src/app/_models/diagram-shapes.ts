export class DiagramShapes {
  ACTIVE_AGENT(agentName: string): object {
    return {
      body: {
        fill: '#C2DEDC'
      },
      label: {
        text: agentName,
        fill: 'black'
      }
    }
  }

  PASSIVE_AGENT(agentName: string): object {
    return {
      body: {
        fill: '#ECE5C7'
      },
      label: {
        text: agentName,
        fill: 'black'
      }
    }
  }

  HIERARCHICAL_AGENT(agentName: string): object {
    return {
      body: {
        fill: '#CDC2AE'
      },
      label: {
        text: agentName,
        fill: 'black'
      }
    }
  }

  PORT(portName: string, position: string): object {
    return {
      position: {
        name: position
      },
      attrs: {
        label: {
          text: portName
        },
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
          args: { y: 0 }
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
}
