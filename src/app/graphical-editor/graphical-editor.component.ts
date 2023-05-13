import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as go from 'gojs'

@Component({
  selector: 'app-graphical-editor',
  templateUrl: './graphical-editor.component.html',
  styleUrls: ['./graphical-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphicalEditorComponent implements OnInit {
  public model: go.GraphLinksModel = new go.GraphLinksModel();

  ngOnInit(): void {
    this.model = new go.GraphLinksModel()
    this.model.linkFromPortIdProperty = "fromPort";
    this.model.linkToPortIdProperty = "toPort";
    this.model.nodeDataArray =
      [
        { key: "A", color: "lightgreen", figure: "RoundedRectangle" },
        { key: "B", color: "lightgreen", figure: "RoundedRectangle" },
        { key: "C", color: "darkgreen", figure: "Rectangle" },
        { key: "D", color: "darkgreen", figure: "Rectangle" }
      ];
    this.model.linkDataArray =
      [
        { from: "A", to: "B" },
        { from: "C", to: "D" },
        { from: "D", to: "A" }
      ];
  }

}
