class Ship {
  constructor(startingPort) {
    this.startingPort = startingPort
  }
  setSail() {
    this.startingPort = false
  }
}

module.exports = {
  Ship,
}
