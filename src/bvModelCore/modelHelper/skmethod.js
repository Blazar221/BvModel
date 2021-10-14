// Use spiral to evenly divide sphere, from "Distributing Many Points on a Sphere" by EB Saff，ABJ Kuijlaars
// default radius is 1, thus the result must be expanded by 'times'
export function divideSphere(times, posArray, nodeArray, idArray, xOffset = 0, yOffset = 0, zOffset = 0) {
  const nodeNum = idArray.length
  // According to some research, this dLong can make best distribution
  const dLong = Math.PI * (3 - Math.sqrt(5))
  const dZ = 2.0 / nodeNum
  let long = 0
  let z = 1 - dZ / nodeNum
  for (let i = 0; i < nodeNum; i++) {
    const r = Math.sqrt(1 - z * z)
    const x = Math.cos(long) * r
    const y = Math.sin(long) * r

    const realX = x * times + xOffset
    const realY = y * times + yOffset
    const realZ = z * times + zOffset

    const id = idArray[i]

    posArray[id * 3] = realX
    posArray[id * 3 + 1] = realY
    posArray[id * 3 + 2] = realZ
    nodeArray[id].setCoordinate(realX, realY, realZ)

    z = z - dZ
    long = long + dLong
  }
}

