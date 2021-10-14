import * as Three from 'three'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from './BvLineGeometry'

const bvLineMaterial = new LineMaterial({
  color: 0xffffff,
  // linewidth: 5, // in pixels
  vertexColors: true,
  // resolution:  // to be set by renderer, eventually
  dashed: false,
  onBeforeCompile: shader => {
    shader.vertexShader = `
      ${shader.vertexShader}
    `.replace(`uniform float linewidth;`, `attribute float linewidth;`)
    // console.log(shader.fragmentShader)
  }
})

export function getBvLines(positions, colors, widths) {
  const lineGeom = new LineGeometry()
  lineGeom.setPositions(positions)
  lineGeom.setColors(colors)
  //InstancedBufferAttribute is correct, Float32BufferAttribute is wrong
  lineGeom.setAttribute('linewidth', new Three.InstancedBufferAttribute(new Float32Array(widths), 1))
  const line = new LineSegments2(lineGeom, bvLineMaterial)
  line.computeLineDistances()
  line.scale.set(1, 1, 1)
  return line
}
