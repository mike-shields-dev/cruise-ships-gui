;(function () {
  class Port {
    constructor(name) {
      this.name = name
      this.ships = []
    }
    addShip(ship) {
      this.ships.push(ship)
    }
    removeShip(shipToRemove) {
      if (this.ships.length === 0) {
        throw new Error("No ships to remove")
      }

      this.ships = this.ships.filter((ship) => ship !== shipToRemove)
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Port
  } else {
    window.Port = Port
  }
})()
