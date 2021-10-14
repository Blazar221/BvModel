import { Frustum, Vector3 } from 'three'

/**
 * This is a class to check whether objects are in a selection area in 3D space
 */
/**
 * Modify to help check the range of Three.Points inside the selection box
 * @author: Blazar
 */
export class BvSelectionBox {
  constructor(camera, targetPoints, deep) {
    this.frustum = new Frustum()

    this.camera = camera
    this.startPoint = new Vector3()
    this.endPoint = new Vector3()
    this.collectionIndex = []
    this.deep = deep || Number.MAX_VALUE
    this.targetPoints = targetPoints
  }

  select(startPoint, endPoint) {
    this.startPoint = startPoint || this.startPoint
    this.endPoint = endPoint || this.endPoint
    this.collectionIndex = []

    this.updateFrustum(this.startPoint, this.endPoint)
    this.searchChildInFrustum(this.frustum)

    return this.collectionIndex
  }

  updateFrustum(startPoint, endPoint) {
    const tmpPoint = new Vector3()

    const vecNear = new Vector3()
    const vecTopLeft = new Vector3()
    const vecTopRight = new Vector3()
    const vecDownRight = new Vector3()
    const vecDownLeft = new Vector3()

    const vecTmp1 = new Vector3()
    const vecTmp2 = new Vector3()
    const vecTmp3 = new Vector3()

    startPoint = startPoint || this.startPoint
    endPoint = endPoint || this.endPoint

    // Avoid invalid frustum

    if (startPoint.x === endPoint.x) {
      endPoint.x += Number.EPSILON
    }

    if (startPoint.y === endPoint.y) {
      endPoint.y += Number.EPSILON
    }

    this.camera.updateProjectionMatrix()
    this.camera.updateMatrixWorld()

    tmpPoint.copy(startPoint)
    tmpPoint.x = Math.min(startPoint.x, endPoint.x)
    tmpPoint.y = Math.max(startPoint.y, endPoint.y)
    this.endPoint.x = Math.max(startPoint.x, endPoint.x)
    this.endPoint.y = Math.min(startPoint.y, endPoint.y)

    vecNear.setFromMatrixPosition(this.camera.matrixWorld)
    vecTopLeft.copy(tmpPoint)
    vecTopRight.set(endPoint.x, tmpPoint.y, 0)
    vecDownRight.copy(endPoint)
    vecDownLeft.set(tmpPoint.x, endPoint.y, 0)

    vecTopLeft.unproject(this.camera)
    vecTopRight.unproject(this.camera)
    vecDownRight.unproject(this.camera)
    vecDownLeft.unproject(this.camera)

    vecTmp1.copy(vecTopLeft).sub(vecNear)
    vecTmp2.copy(vecTopRight).sub(vecNear)
    vecTmp3.copy(vecDownRight).sub(vecNear)
    vecTmp1.normalize()
    vecTmp2.normalize()
    vecTmp3.normalize()

    vecTmp1.multiplyScalar(this.deep)
    vecTmp2.multiplyScalar(this.deep)
    vecTmp3.multiplyScalar(this.deep)
    vecTmp1.add(vecNear)
    vecTmp2.add(vecNear)
    vecTmp3.add(vecNear)

    const planes = this.frustum.planes

    planes[0].setFromCoplanarPoints(vecNear, vecTopLeft, vecTopRight)
    planes[1].setFromCoplanarPoints(vecNear, vecTopRight, vecDownRight)
    planes[2].setFromCoplanarPoints(vecDownRight, vecDownLeft, vecNear)
    planes[3].setFromCoplanarPoints(vecDownLeft, vecTopLeft, vecNear)
    planes[4].setFromCoplanarPoints(vecTopRight, vecDownRight, vecDownLeft)
    planes[5].setFromCoplanarPoints(vecTmp3, vecTmp2, vecTmp1)
    planes[5].normal.multiplyScalar(-1)
  }

  searchChildInFrustum(frustum) {
    const positionArray = this.targetPoints.geometry.attributes.position.array
    const vecTmp = new Vector3()
    for (let i = 0; i < positionArray.length; i += 3) {
      vecTmp.set(positionArray[i], positionArray[i + 1], positionArray[i + 2])
      if (frustum.containsPoint(vecTmp)) {
        this.collectionIndex.push(i)
      }
    }
  }
}
