import {Injectable} from '@angular/core';
import {Ace} from "ace-builds";

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private aceEditor: Ace.Editor

  constructor() {
  }

  setEditor(editor: Ace.Editor) {
    this.aceEditor = editor
    this.aceEditor.setTheme('ace/theme/twilight');
    this.aceEditor.session.setMode('ace/mode/haskell');
    this.aceEditor.container.style.scrollbarGutter = 'blue'
  }

  getValue(): string {
    return this.aceEditor.session.getValue()
  }

  setValue(text: string): void {
    this.aceEditor.session.setValue(text)
  }

  clear(): void {
    this.aceEditor.session.setValue('')
  }

  addAgent(agentName: string): void {
    let newValue: string = this.aceEditor.session.getValue()
    newValue += "\n\nagent " + agentName + " {\n\n}"
    this.aceEditor.setValue(newValue)
  }
}
