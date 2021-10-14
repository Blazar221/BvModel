/*
 * @Author: Blazar
 * @Date: 2021-07-08 21:24:49
 * @LastEditTime: 2021-07-08 21:51:53
 * @LastEditors: Blazar
 * @Description: DappModel type-color hint
 * @FilePath: \indigo-web\src\components\bvModel\modelHelper\tooltip\dappTypeColorHint.js
 */
export class DappTypeColorHint {
  constructor(element) {
    this.label = document.createElement('div')
    this.label.innerHTML = '<p style=\"color:#F08080\">games</p><p style=\"color:#FF8C00\">defi</p>' +
      '<p style=\"color:#FF4500\">gambling</p><p style=\"color:#00FF00\">exchanges</p>' +
      '<p style=\"color:#20B2AA\">collectibles</p><p style=\"color:#00BFFF\">marketplace</p>' +
      '<p style=\"color:#BA55D3\">social</p><p style=\"color:#FF1493\">others</p><p style=\"color:#F5F5DC\">high-risk</p>'
    const fontSize = Math.min(element.clientWidth / 96, element.height / 29)
    this.label.style.fontSize = fontSize + 'px'
    this.label.style.fontFamily = 'Helvetica'
    this.label.style.position = 'absolute'
    this.label.style.bottom = '0.3vh'
    this.label.style.left = '0.3vw'
    this.label.style.width = 'fit-content'
    this.label.style.zIndex = '100'
    this.label.style.display = 'none'
    this.label.style.color = 'rgb(255,255,255,0.6)'
    this.label.style.userSelect = 'none'
    element.appendChild(this.label)
  }

  hide() {
    this.label.style.display = 'none'
  }

  show() {
    this.label.style.display = 'block'
  }
}
