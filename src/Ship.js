;(function () {
  class Ship {
    constructor(itinerary) {
      this.itinerary = itinerary
      this.currentPort = itinerary.ports[0]
      this.currentPort.addShip(this)
      this.previousPort = null
    }
    setSail() {
      if (!this.currentPort) {
        throw new Error("The ship is not docked")
      }

      const hasNextPort =
        this.itinerary.ports.indexOf(this.currentPort) + 1 <
        this.itinerary.ports.length

      if (!hasNextPort) {
        throw new Error("The ship has arrived at its final destination")
      }

      this.currentPort.positionShip(this)
      this.previousPort = this.currentPort
      this.currentPort = null
    }
    dock() {
      if (this.currentPort) {
        throw new Error("Ship is already docked")
      }

      const indexOfPreviousPort = this.itinerary.ports.indexOf(
        this.previousPort
      )
      const indexOfNextPort = indexOfPreviousPort + 1
      const hasNextPort = indexOfNextPort < this.itinerary.ports.length

      if (!hasNextPort) {
        throw new Error("The ship has arrived at its final destination")
      }
      this.currentPort = this.itinerary.ports.at(indexOfNextPort)
      this.currentPort.addShip(this)
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Ship
  } else {
    window.Ship = Ship
  }
})()
