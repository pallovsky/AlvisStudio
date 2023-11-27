import {Injectable} from '@angular/core';
import {EditorService} from "./editor.service";
import {GraphService} from "./graph.service";
import {ProjectData} from "../_models/project-data";
import {ProjectNameModalComponent} from "../main-view/project-name-modal/project-name-modal.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ExportService} from "./export.service";
import {FileSavedModalComponent} from "../main-view/project-name-modal/file-saved-modal/file-saved-modal.component";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
    private editorService: EditorService,
    private graphService: GraphService,
    private exportService: ExportService,
    private modalService: NgbModal,
  ) {
  }

  onClick(option: string) {
    let chosenOption: MenuOptions = MenuOptions.fromString(option)

    switch (chosenOption) {
      case MenuOptions.NEW: {
        this.graphService.graphInstance.clear()
        this.editorService.clear()
        localStorage.clear()
        break
      }
      case MenuOptions.SAVE: {
        let currentProjectExist: boolean = localStorage.getItem('project-data') != null
        let currentProjectData: ProjectData = new ProjectData(null, this.graphService.graphInstance.toJSON(), this.editorService.getValue())

        if (currentProjectExist) {
          let savedProject: ProjectData = JSON.parse(localStorage.getItem('project-data'))
          currentProjectData.name = savedProject.name
          localStorage.setItem('project-data', JSON.stringify(currentProjectData))
          this.modalService.open(FileSavedModalComponent);
          break
        } else {
          const modalRef: NgbModalRef = this.modalService.open(ProjectNameModalComponent);
          modalRef.componentInstance.currentProjectData = currentProjectData;
          break
        }
      }
      case MenuOptions.SAVE_AS: {
        let currentProjectData: ProjectData = new ProjectData(null, this.graphService.graphInstance.toJSON(), this.editorService.getValue())
        const modalRef: NgbModalRef = this.modalService.open(ProjectNameModalComponent);
        modalRef.componentInstance.currentProjectData = currentProjectData
        break
      }
      case MenuOptions.OPEN: {
        let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
        element.click();

        element.addEventListener("input", (event: Event): void => {
          // @ts-ignore
          let files: File[] = event.target.files

          if (files.length != 0) {
            let file: File = files[0];
            file.text().then((fileContent: string): void => {
              let jsonObject = JSON.parse(fileContent)
              let projectData: ProjectData = jsonObject as ProjectData

              this.graphService.graphInstance.fromJSON(projectData.graph)
              this.editorService.setValue(projectData.code)
            })
          }
        })
        break
      }

      case MenuOptions.EXPORT_TO_SVG: {
        this.exportService.exportToSVG()
        break
      }
      case MenuOptions.EXPORT_TO_PNG: {
        this.exportService.exportToPNG()
        break
      }

      case MenuOptions.EXPORT_TO_XML: {
        this.exportService.exportToXML()
        break
      }

      case MenuOptions.EXPORT_TO_JSON: {
        this.exportService.exportToJson()
        break
      }

      case MenuOptions.ABOUT_ALVIS: {
        window.open('https://alvis.kis.agh.edu.pl/wiki/alvis:start')
        break
      }

    }
  }
}

enum MenuOptions {
  NEW = 0,
  OPEN = 1,
  SAVE = 2,
  SAVE_AS = 3,
  ABOUT_ALVIS = 4,
  ALVIS_DOCS = 5,
  ALVIS_STUDIO_DOCS = 6,
  EXPORT_TO_EPS = 7,
  EXPORT_TO_SVG = 8,
  EXPORT_TO_PNG = 9,
  EXPORT_TO_XML = 10,
  EXPORT_TO_JSON = 11,
}

namespace MenuOptions {
  export function fromString(option: string): MenuOptions {
    switch (option) {
      case 'New':
        return MenuOptions.NEW
      case 'Save':
        return MenuOptions.SAVE
      case 'Save as':
        return MenuOptions.SAVE_AS
      case 'Open':
        return MenuOptions.OPEN
      case 'About Alvis':
        return MenuOptions.ABOUT_ALVIS
      case 'Alvis docs':
        return MenuOptions.ALVIS_DOCS
      case 'Alvis studio docs':
        return MenuOptions.ALVIS_STUDIO_DOCS
      case 'Export to EPS':
        return MenuOptions.EXPORT_TO_EPS
      case 'Export to SVG':
        return MenuOptions.EXPORT_TO_SVG
      case 'Export to PNG':
        return MenuOptions.EXPORT_TO_PNG
      case 'Export to XML':
        return MenuOptions.EXPORT_TO_XML
      case 'Export to JSON':
        return MenuOptions.EXPORT_TO_JSON
      default:
        return MenuOptions[option]
    }
  }
}
