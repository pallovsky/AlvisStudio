import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NavbarDropdownComponent} from './navbar/navbar-dropdown/navbar-dropdown.component';
import {CodeEditorComponent} from './code-editor/code-editor.component';
import {GraphicalEditorComponent} from './graphical-editor/graphical-editor.component';
import {MainViewComponent} from './main-view/main-view.component';
import {DiagramComponent} from './graphical-editor/diagram/diagram.component';
import {NgOptimizedImage} from "@angular/common";
import {AddAgentModalComponent} from './graphical-editor/diagram/add-agent-modal/add-agent-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from "@angular/forms";
import { AddPortModalComponent } from './graphical-editor/diagram/add-port-modal/add-port-modal.component';
import {GraphService} from "./_services/graph.service";
import {EditorService} from "./_services/editor.service";
import {MenuService} from "./_services/menu.service";
import { ProjectNameModalComponent } from './main-view/project-name-modal/project-name-modal.component';
import {FileSaverModule} from "ngx-filesaver";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarDropdownComponent,
    CodeEditorComponent,
    GraphicalEditorComponent,
    MainViewComponent,
    DiagramComponent,
    AddAgentModalComponent,
    AddPortModalComponent,
    ProjectNameModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgbModule,
    ReactiveFormsModule,
    FileSaverModule,
  ],
  providers: [
    MenuService,
    GraphService,
    EditorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
