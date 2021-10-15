import * as Three from 'three'

const _v1$4 = new Three.Vector3()
const _v2$2 = new Three.Vector3()

/**
 * CustomLOD, only receives one Threejs object and one distance to determine the max distance
 * camera can see this object.
 */
export class BvLOD extends Three.Object3D {

  constructor() {

    super()

    this.innerObject = null

    this.visibleDistance = 0

    this.type = 'CustomLOD'

    this.isLOD = true

    this.autoUpdate = true

  }

  copy(source) {

    super.copy(source, false)

    this.addObject(source.innerObject.clone, source.visibleDistance)

    this.autoUpdate = source.autoUpdate

    return this

  }

  addObject(object, distance = 0) {

    this.visibleDistance = Math.abs(distance)

    this.innerObject = object

    this.add(object)

    return this

  }

  getObject() {

    return this.innerObject

  }

  raycast(raycaster, intersects) {

    if (this.innerObject) {

      _v1$4.setFromMatrixPosition(this.matrixWorld)

      // eslint-disable-next-line no-unused-vars
      const distance = raycaster.ray.origin.distanceTo(_v1$4)

      this.innerObject.raycast(raycaster, intersects)

    }

  }

  update(camera) {

    // eslint-disable-next-line no-unused-vars
    const levels = this.levels

    if (this.innerObject) {

      _v1$4.setFromMatrixPosition(camera.matrixWorld)
      _v2$2.setFromMatrixPosition(this.matrixWorld)

      const distance = _v1$4.distanceTo(_v2$2) / camera.zoom

      this.innerObject.visible = (distance < this.visibleDistance)

    }

  }

  toJSON(meta) {

    const data = super.toJSON(meta)

    if (this.autoUpdate === false) data.object.autoUpdate = false

    data.object.innerObject = this.innerObject.uuid
    data.object.visibleDistance = this.visibleDistance

    return data

  }

}
