import {AfterViewInit, Component, Input} from '@angular/core';
import * as go from 'gojs';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit {

  @Input()
  public model: go.Model;
  public diagram: go.Diagram = null;
  public palette: go.Palette = null;

  ngAfterViewInit(): void {
    this.diagram = $(go.Diagram, 'myDiagramDiv');
    this.diagram.model = this.model;
    this.diagram.initialPosition = new go.Point(-1, 5000);
    this.diagram.initialScale = 3
    this.diagram.undoManager.isEnabled = true;

    this.diagram.nodeTemplate =
      new go.Node("Auto")
        .add(new go.Shape({
          minSize: new go.Size(60, 10)
        })
          .bind("figure", "figure")
          .bind("fill", "color"))
        .add(new go.TextBlock({margin: 8})
          .bind("text", "key"));

    this.palette = $(go.Palette, "myPaletteDiv");

    this.palette.nodeTemplate =
      new go.Node("Auto")
        .add(new go.Shape({
          width: 150, height: 50
        })
          .bind("figure", "figure")
          .bind("fill", "color"))
        .add(new go.TextBlock({
          margin: 8
        })
          .bind("text", "key"));

    this.palette.model.nodeDataArray = [
      {key: "Active agent", color: "lightgreen"},
      {key: "Passive agent", color: "darkgreen"},
      {key: "Hierarchical agent", color: "green"},
    ];

  }
}
