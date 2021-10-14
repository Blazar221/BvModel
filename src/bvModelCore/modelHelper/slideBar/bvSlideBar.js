export class BvSlideBar {
  constructor(containerEle, tagList) {
    this.parentEle = document.createElement('div')
    this.tagList = tagList

    this.slideBar = document.createElement('input')
    this.slideBar.type = 'range'
    this.slideBar.min = '0'
    this.slideBar.max = (tagList.length - 1) + ''
    this.slideBar.class = 'slider'
    this.slideBar.style.webkitAppearance = 'none'
    this.slideBar.style.width = '80%'
    this.slideBar.style.height = '2vh'
    this.slideBar.style.background = '#d3d3d3'
    this.slideBar.style.borderRadius = '8px'
    this.slideBar.style.outline = 'none'
    this.slideBar.style.opacity = 0.7
    this.slideBar.style.position = 'absolute'
    this.slideBar.style.bottom = '2vh'
    this.slideBar.style.left = '10%'
    this.slideBar.value = '0' // init cursor to 0
    this.parentEle.appendChild(this.slideBar)

    this.hint = document.createElement('div')
    this.hint.style.width = 'fit-content'
    this.hint.style.height = 'fit-content'
    this.hint.style.color = '#FFFFFF'
    this.hint.style.opacity = 0.7
    this.hint.style.position = 'absolute'
    this.hint.style.bottom = '4vh'
    this.hint.style.left = '10%'
    this.hint.style.userSelect = 'none'
    this.hint.innerHTML = this.tagList[0]
    this.parentEle.appendChild(this.hint)

    containerEle.appendChild(this.parentEle)
  }

  getSlideBar() {
    return this.slideBar
  }

  getValue() {
    return this.slideBar.value
  }

  updateTag() {
    this.hint.innerHTML = this.tagList[this.slideBar.value]
  }
}
