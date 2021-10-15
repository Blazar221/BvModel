import * as Three from 'three'

const DEFAULT_COLOR = 0xFFFFFF
// export const DEFAULT_COLOR = 0x6A2DDC;
const DEFAULT_CHOSEN_POINT_COLOR = 0xFF0000
const DEFAULT_CHOSEN_LINE_COLOR = 0xFFFF00

const DEFAULT_BEGIN_H = 0.33
const DEFAULT_END_H = 0.53

const COLOR_MAP = [
  [0, 0.79, 0.72], // 0xF08080
  [33 / 360, 1.0, 0.5], // 0xFF8C00
  [16 / 360, 1.0, 0.5], // 0xFF4500
  [120 / 360, 1.0, 0.5], // 0x00FF00
  [177 / 360, 0.7, 0.41], // 0x20B2AA,
  [195 / 360, 1.0, 0.5], // 0x00BFFF,
  [288 / 360, 0.59, 0.58], // 0xBA55D3
  [328 / 360, 1.0, 0.54], // 0xFF1493,
  [60 / 360, 0.56, 0.91] // 0xF5F5DC
]

function getThreeColorByType(type) {
  const hslColor = new Three.Color()
  const typeColorArr = COLOR_MAP[type]
  hslColor.setHSL(typeColorArr[0], typeColorArr[1], typeColorArr[2])
  return hslColor
}

export default {
  DEFAULT_COLOR,
  DEFAULT_CHOSEN_POINT_COLOR,
  DEFAULT_CHOSEN_LINE_COLOR,
  DEFAULT_BEGIN_H,
  DEFAULT_END_H,
  getThreeColorByType
}
