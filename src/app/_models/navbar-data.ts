export class NavbarData {
  file: DropdownData = new DropdownData({
      name: 'File',
      dividedOptions: [['New', 'Open'], ['Save', 'Save as']]
    }
  )
  export: DropdownData = new DropdownData({
      name: 'Export',
      dividedOptions: [['Export to JSON', 'Export to EPS', 'Export to SVG', 'Export to PNG', 'Export to XML']]
    }
  )
  help: DropdownData = new DropdownData({
      name: 'Help',
      dividedOptions: [['About Alvis', 'Alvis docs', 'Alvis studio docs']]
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
