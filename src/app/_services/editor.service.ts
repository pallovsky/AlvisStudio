import { Injectable } from '@angular/core';
import {Ace} from "ace-builds";

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private aceEditor: Ace.Editor

  constructor() { }

  setEditor(editor: Ace.Editor) {
    this.aceEditor = editor
    this.aceEditor.setTheme('ace/theme/twilight');
    this.aceEditor.session.setMode('ace/mode/haskell');
  }

  getValue(): string {
    return this.aceEditor.session.getValue()
  }

  setValue(text: string) {
    this.aceEditor.session.setValue(text)
  }

  clear() {
    this.aceEditor.session.setValue('')
  }
}
