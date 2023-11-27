import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as ace from "ace-builds";
import {EditorService} from "../_services/editor.service";
import {ProjectData} from "../_models/project-data";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild("editor") private editor: ElementRef<HTMLElement> | undefined;

  constructor(private editorService: EditorService) {
  }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "18px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.editorService.setEditor(ace.edit(this.editor!.nativeElement))

    // Loading code if project exists
    let currentProjectExist: boolean = localStorage.getItem('project-data') != null
    if (currentProjectExist) {
      let projectData: ProjectData = JSON.parse(localStorage.getItem('project-data')) as ProjectData
      this.editorService.setValue(projectData.code)
    }
  }
}
