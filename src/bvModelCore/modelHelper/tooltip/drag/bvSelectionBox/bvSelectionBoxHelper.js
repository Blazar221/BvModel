import { Vector2 } from 'three'

export class BvSelectionBoxHelper {
  constructor(renderer) {
    this.boxHinter = document.createElement('div')
    this.boxHinter.style.border = '1px solid #55aaff'
    this.boxHinter.style.backgroundColor = 'rgba(75, 160, 255, 0.3)'
    this.boxHinter.style.position = 'fixed'
    this.boxHinter.style.userSelect = 'none'
    this.boxHinter.style.pointerEvents = 'none'

    this.renderer = renderer

    this.startPoint = new Vector2()
    this.pointTopLeft = new Vector2()
    this.pointBottomRight = new Vector2()

    this.isDown = false

    this.isEnable = false

    this.renderer.domElement.addEventListener('pointerdown', () => {
      if (this.isEnable) {
        this.isDown = true
        this.onSelectStart(event)
      }
    })

    this.renderer.domElement.addEventListener('pointermove', () => {
      if (this.isEnable) {
        if (this.isDown) {
          this.onSelectMove(event)
        }
      }
    })

    this.renderer.domElement.addEventListener('pointerup', () => {
      if (this.isEnable && this.isDown) {
        this.onSelectOver(event)
      }
    })
  }

  enable() {
    this.isEnable = true
  }

  disable() {
    this.isEnable = false
  }

  reset() {
    this.isDown = false
  }

  onSelectStart() {
    this.renderer.domElement.parentElement.appendChild(this.boxHinter)

    this.boxHinter.style.left = event.clientX + 'px'
    this.boxHinter.style.top = event.clientY + 'px'
    this.boxHinter.style.width = '0px'
    this.boxHinter.style.height = '0px'

    this.startPoint.x = event.clientX
    this.startPoint.y = event.clientY
  }

  onSelectMove() {
    this.pointBottomRight.x = Math.max(this.startPoint.x, event.clientX)
    this.pointBottomRight.y = Math.max(this.startPoint.y, event.clientY)
    this.pointTopLeft.x = Math.min(this.startPoint.x, event.clientX)
    this.pointTopLeft.y = Math.min(this.startPoint.y, event.clientY)

    this.boxHinter.style.left = this.pointTopLeft.x + 'px'
    this.boxHinter.style.top = this.pointTopLeft.y + 'px'
    this.boxHinter.style.width = (this.pointBottomRight.x - this.pointTopLeft.x) + 'px'
    this.boxHinter.style.height = (this.pointBottomRight.y - this.pointTopLeft.y) + 'px'
  }

  onSelectOver() {
    this.boxHinter.parentElement.removeChild(this.boxHinter)
  }
}
