export class ControlHint {
  constructor(element) {
    this.label = document.createElement('div')
    this.label.innerText = 'Mouse Left Press & Move: Rotate\nMouse Right Press & Move: Pan\n' +
      'Mouse Middle Roll: Zoom\nMouse Left Click: Check Node Info\nMouse Right Click: Check Link Info\n' +
      "Press 'L': Open/Close Interaction Mode\nMouse Drag: Select Nodes (Only Interaction Mode)\nPress 'H': Open/Close" +
      ' This Hint'
    this.label.style.fontSize = '1px'
    this.label.style.position = 'absolute'
    this.label.style.bottom = '0.3vh'
    this.label.style.left = '0.3vw'
    this.label.style.width = 'fit-content'
    this.label.style.zIndex = '100'
    this.label.style.display = 'none'
    this.label.style.color = 'rgb(255,255,255,0.6)'
    this.label.style.userSelect = 'none'
    element.appendChild(this.label)

    this.style = this.label.style
  }

  hide() {
    this.label.style.display = 'none'
  }

  show() {
    this.label.style.display = 'block'
  }
}
