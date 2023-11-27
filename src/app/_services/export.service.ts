import {Injectable} from '@angular/core';
import {dia, g} from "jointjs";
import {FileSaverService} from "ngx-filesaver";
import {GraphService} from "./graph.service";
import {EditorService} from "./editor.service";
import {ProjectData} from "../_models/project-data";

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  paper: dia.Paper

  constructor(
    private fileSaver: FileSaverService,
    private graphService: GraphService,
    private editorService: EditorService,
  ) {
  }

  exportToSVG(): void {
    let svgElement: SVGElement = this.paper.svg;
    let svgString: string = new XMLSerializer().serializeToString(svgElement);
    svgString = svgString.replace("xmlns:xlink=\"http://www.w3.org/1999/xlink\"", '');

    let blob: Blob = new Blob([svgString], {type: 'image/svg+xml'})
    this.fileSaver.save(blob, 'export' + '.svg');
  }

  exportToPNG(): void {
    let svgElement: SVGElement = this.paper.svg;
    let svgString: string = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const img = new Image();
    img.onload = function () {
      canvas.width = img.width * 4;
      canvas.height = img.height * 4;
      context.drawImage(img, 0, 0);

      const pngDataUrl = canvas.toDataURL('image/png');

      const a = document.createElement('a');
      a.href = pngDataUrl;
      a.download = 'export';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src = 'data:image/svg+xml,' + encodeURIComponent(svgString);
  }

  exportToXML(): void {
    let graph: dia.Graph = this.graphService.graphInstance
    let xml: string = this.getGraphXml(graph)

    let blob: Blob = new Blob([xml], {type: 'application/xml'})
    this.fileSaver.save(blob, 'export' + '.alvis');
  }

  exportToJson(): void {
    let currentProjectData: ProjectData = new ProjectData(null, this.graphService.graphInstance.toJSON(), this.editorService.getValue())
    let blob: Blob = new Blob([JSON.stringify(currentProjectData)], { type: 'text/plain;charset=utf-8' })
    this.fileSaver.save(blob, 'export' + '.json');
  }

  private getGraphXml(graph: dia.Graph): string {
    return `
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE alvisproject PUBLIC "alvisPublicId-v0.1" "alvisSystemId-v0.1">
      <alvisproject>
      <hierarchy>
      <node agent="" name="System"/>
      </hierarchy>
      <page name="System">
      ${this.getAgentsXML(graph)}
      ${this.getLinksXML(graph)}
      </page>
      <code>
      ${this.editorService.getValue()}
      </code>
      </alvisproject>
    `.split('\n').map(line => line.trim()).join('\n')
  }

  private getAgentsXML(graph: dia.Graph): string {
    let agentsXml: string = ''
    graph.getElements().forEach((element: dia.Element, index: number) => {
      const position: g.PlainPoint = element.attributes['position']
      const size: dia.Size = element.attributes['size']
      const active: number = element.attributes['attrs']['body'].fill == '#0b3954' ? 1 : 0
      const name: string = element.attributes['attrs']['label'].text
      agentsXml += `<agent active="${active}" color="white"  index="${index}" name="${name}" running="0" width="${size.width}" height="${size.height}" x="${position.x}" y="${position.y}">\n`
      element.getPorts().forEach((port: dia.Element.Port) => {
        const label = port.attrs['label']
        agentsXml += `<port color="white" id="${port.id}" name="${label.text}"/>\n`
      })
      agentsXml += '</agent>\n'
    })
    return agentsXml
  }

  private getLinksXML(graph: dia.Graph): string {
    let linksXml: string = ''
    graph.getLinks().forEach((link: dia.Link) => {
      linksXml += `<connection direction="target" source="${link.source().port}" style="straight" target="${link.target().port}"/>`
    })
    return linksXml
  }
}
