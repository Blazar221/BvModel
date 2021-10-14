import { BvLOD } from './bvLOD'

import { getRawSpriteText } from './spriteText'

export function getBvSpriteTextLod(text, x, y, z, maxDistance, pamamters) {
  const spriteText = getRawSpriteText(text, pamamters)

  const lod = new BvLOD()
  lod.addObject(spriteText, maxDistance)
  lod.position.x = x
  lod.position.y = y
  lod.position.z = z

  return lod
}
