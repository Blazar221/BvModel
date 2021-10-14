export class Node {
  constructor(
    id,
    x,
    y,
    z,
    degree,
    addressArray,
    genre,
    birth,
    balance,
    recentNum,
    tag
  ) {
    this.id = id
    this.x = x
    this.y = y
    this.z = z
    this.degree = degree
    this.addressArray = addressArray

    this.genre = genre
    this.birth = birth
    this.balance = balance
    this.recentNum = recentNum
    this.tag = tag
  }

  setCoordinate(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}
