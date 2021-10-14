import * as Three from 'three'

const DEFAULT_COLOR = 0xFFFFFF
// export const DEFAULT_COLOR = 0x6A2DDC;
const DEFAULT_CHOSEN_POINT_COLOR = 0xFF0000
const DEFAULT_CHOSEN_LINE_COLOR = 0xFFFF00

const DEFAULT_BEGIN_H = 0.33
const DEFAULT_END_H = 0.53

const DAPP_COLOR_MAP = {
  'games': [0, 0.79, 0.72], // 0xF08080
  'defi': [33 / 360, 1.0, 0.5], // 0xFF8C00
  'gambling': [16 / 360, 1.0, 0.5], // 0xFF4500
  'exchanges': [120 / 360, 1.0, 0.5], // 0x00FF00
  'collectibles': [177 / 360, 0.7, 0.41], // 0x20B2AA,
  'marketplaces': [195 / 360, 1.0, 0.5], // 0x00BFFF,
  'social': [288 / 360, 0.59, 0.58], // 0xBA55D3
  'other': [328 / 360, 1.0, 0.54], // 0xFF1493,
  'high-risk': [60 / 360, 0.56, 0.91] // 0xF5F5DC
}

function getThreeColorByCategory(category, offset) {
  const hslColor = new Three.Color()
  const typeColorArr = DAPP_COLOR_MAP[category]
  const lightChange = Math.min(1.2, Math.max(offset / 8, 0.85)) // 超过8个用户就属于用户量较高水平
  hslColor.setHSL(typeColorArr[0], typeColorArr[1], typeColorArr[2] * lightChange)
  return hslColor
}

export default {
  DEFAULT_COLOR,
  DEFAULT_CHOSEN_POINT_COLOR,
  DEFAULT_CHOSEN_LINE_COLOR,
  DEFAULT_BEGIN_H,
  DEFAULT_END_H,
  DAPP_COLOR_MAP,
  getThreeColorByCategory
}
