export class AddTagHelper {
  constructor(parentEle) {
    this.element = document.createElement('div')
    this.element.innerText = 'Add Tag'
    this.element.style.position = 'absolute'
    this.element.style.top = '10vh'
    this.element.style.left = '1vw'
    this.element.style.width = '10vw'
    this.element.style.zIndex = '100'
    this.element.style.display = 'none'
    this.element.style.color = '#ffffff'
    this.element.style.background = 'rgb(12,12,12,0.8)'
    this.element.style.padding = '10px'
    this.element.style.userSelect = 'none'
    this.element.style.borderRadius = '10px'
    this.element.style.display = 'flex'
    this.element.style.flexDirection = 'column'
    this.element.style.textAlign = 'center'

    const buttonGroup = document.createElement('div')
    buttonGroup.style.display = 'flex'
    buttonGroup.style.flexDirection = 'row'
    buttonGroup.style.justifyContent = 'space-between'
    buttonGroup.style.width = 'inherit'
    buttonGroup.style.height = 'inherit'

    this.inputButton = document.createElement('input')
    this.inputButton.type = 'text'
    this.inputButton.value = 'Please input tag'
    this.inputButton.style.width = '8vw'
    this.inputButton.style.margin = '3px'

    buttonGroup.appendChild(this.inputButton)
    this.element.appendChild(buttonGroup)
    parentEle.appendChild(this.element)
  }

  hide() {
    this.element.style.display = 'none'
  }

  show() {
    this.element.style.display = 'flex'
  }
}
