import {Injectable} from '@angular/core';
import {dia} from "jointjs";
import {FileSaverService} from "ngx-filesaver";

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  paper: dia.Paper

  constructor(
    private fileSaver: FileSaverService
  ) { }

  exportToSVG() {
    let svgElement: SVGElement = this.paper.svg;
    let svgString: string = new XMLSerializer().serializeToString(svgElement);
    svgString = svgString.replace("xmlns:xlink=\"http://www.w3.org/1999/xlink\"", '');

    let blob: Blob = new Blob([svgString], { type: 'image/svg+xml' })
    this.fileSaver.save(blob, 'export' + '.svg');
  }

  exportToPNG() {
    let svgElement: SVGElement = this.paper.svg;
    let svgString: string = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const img = new Image();
    img.onload = function () {
      canvas.width = img.width*4;
      canvas.height = img.height*4;
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
}
