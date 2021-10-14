import Entity from './entity'
import { divideSphere } from './skmethod'
import { getBvPoints } from './point/bvPoints'
import { getBvSpheres } from './sphere/customSphere'
import { getBvLines } from './line/bvLines'
import { getBvSpriteTextLod } from './spriteText/getBvSpriteTextLod'
import { InfoLabel } from './tooltip/click/infoLabel'
import { InteractionHelper } from './tooltip/drag/interactionHelper'
import { AddTagHelper } from './tooltip/addTagHelper'
import { BvSelectionBoxHelper } from './tooltip/drag/bvSelectionBox/bvSelectionBoxHelper'
import { BvSelectionBox } from './tooltip/drag/bvSelectionBox/bvSelectionBox'
import { ControlHint } from './tooltip/controlHint'
import { DappTypeColorHint } from './tooltip/dappTypeColorHint'
import { BvSlideBar } from './slideBar/bvSlideBar'

import MODEL_COLOR from './color'

const DEFAULT_SIZE_SCALE = 5

const MIN_ALPHA = 0.4

const DEFAULT_PANEL_WIDTH = 300
// TODO optimize this scale
const DAPP_DUMMY_POINT_SCALE = 2400

export default {
  // Entity
  Node: Entity.Node,
  Link: Entity.Link,
  LinkDetail: Entity.LinkDetail,
  DappNode: Entity.DappNode,
  DappRelation: Entity.DappRelation,
  // Tooltip
  InfoLabel,
  InteractionHelper,
  AddTagHelper,
  ControlHint,
  DappTypeColorHint,
  // SlideBar
  BvSlideBar,
  // Custom Mesh
  getBvPoints,
  getBvSpheres,
  getBvLines,
  BvSelectionBoxHelper,
  BvSelectionBox,
  DEFAULT_SIZE_SCALE,
  MIN_ALPHA,
  MODEL_COLOR,
  DEFAULT_PANEL_WIDTH,
  DAPP_DUMMY_POINT_SCALE,
  getBvSpriteTextLod,
  divideSphere
}
