export class DappRelation {
  constructor(dapp1, dapp2, value) {
    this.id1 = dapp1.id
    this.index1 = dapp1.index
    this.category1 = dapp1.category
    this.colorOffset1 = dapp1.userCount
    this.x1 = dapp1.x
    this.y1 = dapp1.y
    this.z1 = dapp1.z
    this.id2 = dapp2.id
    this.index2 = dapp2.index
    this.category2 = dapp2.category
    this.colorOffset2 = dapp2.userCount
    this.x2 = dapp2.x
    this.y2 = dapp2.y
    this.z2 = dapp2.z
    this.value = value
  }

}
