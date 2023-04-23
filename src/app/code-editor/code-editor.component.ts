import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as ace from "ace-builds";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild("editor") private editor: ElementRef<HTMLElement> | undefined;

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");

    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    const aceEditor = ace.edit(this.editor!.nativeElement);

    aceEditor.session.setValue("" +
      "agent A {\n" +
      "  x :: Int = 5;\n" +
      "  out q x;\n" +
      "}\n" +
      "\n" +
      "agent B {\n" +
      "  x :: Int = 0;\n" +
      "  proc p1 { in p1 x; exit; }\n" +
      "  proc p2 { in p2 x; exit; }\n" +
      "}");

    aceEditor.setTheme('ace/theme/twilight');
    aceEditor.session.setMode('ace/mode/haskell');
  }
}
