class Ship {
  constructor(port) {
    this.currentPort = port || null
  }
  setSail() {
    this.currentPort = null
  }
  dock(port) {
    this.currentPort = port
  }
}

module.exports = {
  Ship,
}
