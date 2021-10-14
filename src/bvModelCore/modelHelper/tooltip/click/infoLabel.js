export class InfoLabel {
  constructor(element) {
    this.label = document.createElement('div')
    this.label.innerText = 'Something'
    this.label.style.position = 'absolute'
    this.label.style.top = '1vh'
    this.label.style.left = '1vw'
    this.label.style.width = 'fit-content'
    this.label.style.zIndex = '100'
    this.label.style.display = 'none'
    this.label.style.color = '#ffffff'
    this.label.style.background = '#6A5ACD'
    this.label.style.padding = '10px'
    this.label.style.userSelect = 'none'
    this.label.style.borderRadius = '10px'
    element.appendChild(this.label)

    this.style = this.label.style
  }

  hide() {
    this.label.style.display = 'none'
  }

  show(xOffset, yOffset, text) {
    this.label.style.display = 'block'
    this.label.style.left = xOffset + 'px'
    this.label.style.top = yOffset + 'px'
    this.label.innerText = text
  }
}
