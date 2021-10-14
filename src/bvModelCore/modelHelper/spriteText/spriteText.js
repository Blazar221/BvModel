/*
 * @Author: Blazar
 * @Date: 2021-07-07 09:36:25
 * @LastEditTime: 2021-07-08 21:38:06
 * @LastEditors: Blazar
 * @Description: Custom ThreeJs sprite text
 * @FilePath: \indigo-web\src\components\bvModel\modelHelper\spriteText\spriteText.js
 */
import * as Three from 'three'

/**
 * 绘制圆角矩形，如果绘制范围超出了canvas的宽高范围，超出的部分不会显示
 * @param context canvas背景
 * @param x 矩形起点相对于左上角的原点在x轴方向的位移
 * @param y 矩形起点相对于左上角的原点在y轴方向的位移
 * @param width 矩形宽度
 * @param height 矩形高度
 * @param radius 圆角半径
 */
function drawRoundRect(context, x, y, width, height, radius) {
  context.beginPath()
  context.moveTo(x + radius, y)
  context.lineTo(x + width - radius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + radius)
  context.lineTo(x + width, y + height - radius)
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  context.lineTo(x + radius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - radius)
  context.lineTo(x, y + radius)
  context.quadraticCurveTo(x, y, x + radius, y)
  context.closePath()
  context.fill()
  context.stroke()
}

const BORDER_THICKNESS = 4
const FONT_SIZE = 18
const FONT = 'Bold 18px Arial'
const CANVAS_WIDTH = 450 // Width must be long enough to put long string
const HEIGHT_SIZE_RATIO = 1.4 // 1.4 is extra height factor for text below baseline: g,j,p,q.
const RADIUS = 6
const DEFAULT_SCALE = 1
const DEFAULT_BORDER_COLOR = { r: 0, g: 0, b: 0, a: 1.0 }
const DEFAULT_BACKGROUND_COLOR = { r: 255, g: 255, b: 255, a: 0.0 }
const DEFAULT_TEXT_COLOR = { r: 255, g: 255, b: 255, a: 1.0 }

export function getRawSpriteText(text, parameters) {
  if (parameters === undefined) parameters = {}
  const scale = {}.hasOwnProperty.call(parameters, 'scale') ? parameters['scale'] : DEFAULT_SCALE

  const borderColor = {}.hasOwnProperty.call(parameters, 'borderColor') ? parameters['borderColor'] : DEFAULT_BORDER_COLOR

  const backgroundColor = {}.hasOwnProperty.call(parameters, 'backgroundColor') ? parameters['backgroundColor'] : DEFAULT_BACKGROUND_COLOR

  const textColor = {}.hasOwnProperty.call(parameters, 'textColor') ? parameters['textColor'] : DEFAULT_TEXT_COLOR

  const canvas = document.createElement('canvas')
  canvas.display = 'block' // Only 'block' can make width-setting work
  canvas.width = CANVAS_WIDTH

  const context = canvas.getContext('2d')
  context.font = FONT

  // get size data (height depends only on font size, about 1.4 * fontsize)
  const metrics = context.measureText(text)
  const textWidth = metrics.width

  // background color
  context.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' + backgroundColor.b + ',' + backgroundColor.a + ')'
  // border color
  context.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ',' + borderColor.b + ',' + borderColor.a + ')'

  context.lineWidth = BORDER_THICKNESS
  drawRoundRect(context, (canvas.width - textWidth - BORDER_THICKNESS) / 2,
    (canvas.height - FONT_SIZE * HEIGHT_SIZE_RATIO - BORDER_THICKNESS) / 2, textWidth + BORDER_THICKNESS,
    FONT_SIZE * HEIGHT_SIZE_RATIO + BORDER_THICKNESS, RADIUS)

  // text color
  context.fillStyle = 'rgba(' + textColor.r + ', ' + textColor.g + ', ' + textColor.b + ', ' + textColor.a + ')'

  context.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2 + FONT_SIZE * HEIGHT_SIZE_RATIO / 4)

  // canvas contents will be used for a texture
  const texture = new Three.CanvasTexture(canvas)
  texture.needsUpdate = true

  // Set alphaTest to material, so that the canvas background won't be rendered
  const spriteMaterial = new Three.SpriteMaterial({ map: texture, alphaTest: 0.3 })
  const sprite = new Three.Sprite(spriteMaterial)
  sprite.scale.set(scale * canvas.width, scale * canvas.height)
  return sprite
}
