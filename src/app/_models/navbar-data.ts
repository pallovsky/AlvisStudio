export class NavbarData {
  file: DropdownData = new DropdownData({
      name: 'File',
      dividedOptions: [['New', 'Open file'], ['Save', 'Save as'], ['Export to EPS', 'Export to SVG', 'Export to PNG'],
        ['Page setup', 'Print'], ['Preferences'], ['Exit']]
    }
  )
  edit: DropdownData = new DropdownData({
      name: 'Edit',
      dividedOptions: [['Undo', 'Redo'], ['Cut', 'Copy', 'Paste'], ['Delete']]
    }
  )
  view: DropdownData = new DropdownData({
      name: 'View',
      dividedOptions: [['Page layout', 'Antialias'], ['Grid', 'Rulers'], ['Zoom in', 'Zoom out']]
    }
  )
  format: DropdownData = new DropdownData({
      name: 'Format',
      dividedOptions: [['Direct to source', 'Direct to target', 'Undirect'], ['Line']]
    }
  )
  alignment: DropdownData = new DropdownData({
      name: 'Alignment',
      dividedOptions: [['Left', 'Center', 'Right'], ['Top', 'Middle', 'Bottom']]
    }
  )
  help: DropdownData = new DropdownData({
      name: 'Help',
      dividedOptions: [['About Alvis', 'Generate report']]
    }
  )
}

export class DropdownData {
  name: string = ''
  dividedOptions: string[][] = []

  constructor(params: DropdownParameters) {
    this.name = params.name
    this.dividedOptions = params.dividedOptions
  }

  static empty(): DropdownData {
    return new DropdownData({name: '', dividedOptions: []})
  }
}

interface DropdownParameters {
  name: string,
  dividedOptions: string[][],
}
