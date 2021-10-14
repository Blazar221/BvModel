export class BvNode {
  constructor(id, index, x, y, z, name, category, userCount, txnCount, contracts) {
    this.id = id
    this.index = index
    this.x = x
    this.y = y
    this.z = z
    this.name = name
    this.category = category
    this.userCount = userCount
    this.txnCount = txnCount
    this.contractStr = contracts // contracts concated by comma
    if (contracts) {// Some dapp has no smart contracts
      this.contractArr = contracts.split(',')
    } else {
      this.contractArr = []
    }
  }
}
