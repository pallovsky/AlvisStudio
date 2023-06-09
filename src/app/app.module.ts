import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NavbarDropdownComponent} from './navbar/navbar-dropdown/navbar-dropdown.component';
import {HierarchyTreeComponent} from './hierarchy-tree/hierarchy-tree.component';
import {CodeEditorComponent} from './code-editor/code-editor.component';
import {GraphicalEditorComponent} from './graphical-editor/graphical-editor.component';
import {MainViewComponent} from './main-view/main-view.component';
import {DiagramComponent} from './graphical-editor/diagram/diagram.component';
import {NgOptimizedImage} from "@angular/common";
import {AddAgentModalComponent} from './graphical-editor/diagram/add-agent-modal/add-agent-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarDropdownComponent,
    HierarchyTreeComponent,
    CodeEditorComponent,
    GraphicalEditorComponent,
    MainViewComponent,
    DiagramComponent,
    AddAgentModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
