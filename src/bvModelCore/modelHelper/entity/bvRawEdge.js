export class BvRawEdge {
  constructor(node1, node2, value) {
    this.id1 = node1.id
    this.index1 = node1.index
    this.type1 = node1.type
    this.x1 = node1.x
    this.y1 = node1.y
    this.z1 = node1.z
    this.id2 = node2.id
    this.index2 = node2.index
    this.type2 = node2.type
    this.x2 = node2.x
    this.y2 = node2.y
    this.z2 = node2.z
    this.value = value
  }

}
