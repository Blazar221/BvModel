export class InteractionHelper {
  constructor(parentEle) {
    this.element = document.createElement('div')
    this.element.innerText = 'Interaction Mode'
    this.element.style.position = 'absolute'
    this.element.style.top = '3vh'
    this.element.style.left = '3vw'
    this.element.style.width = '8vw'
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

    this.resetButton = document.createElement('input')
    this.resetButton.type = 'button'
    this.resetButton.value = 'Reset'
    this.resetButton.style.width = '4vw'
    this.resetButton.style.margin = '1px'

    this.confirmButton = document.createElement('input')
    this.confirmButton.type = 'button'
    this.confirmButton.value = 'Confirm'
    this.confirmButton.style.width = '4vw'
    this.confirmButton.style.margin = '1px'

    buttonGroup.appendChild(this.resetButton)
    buttonGroup.appendChild(this.confirmButton)
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
