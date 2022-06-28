;(function () {
  class Ship {
    constructor(itinerary) {
      this.itinerary = itinerary
      this.currentPort = itinerary.ports[0]
      this.currentPort.addShip(this)
      this.previousPort = null
      this.isSailing = false
      this.hasCompletedItinerary = false
    }
    setSail() {
      if (!this.currentPort) {
        throw new Error("The ship is not docked")
      }

      if (this.hasCompletedItinerary) {
        throw new Error("The ship has arrived at its final destination")
      }

      this.currentPort.removeShip(this)
      this.previousPort = this.currentPort
      this.currentPort = null
    }
    dock() {
      if (this.currentPort) {
        throw new Error("Ship is already docked")
      }

      if (this.hasCompletedItinerary) {
        throw new Error("The ship has arrived at its final destination")
      }

      const indexOfPreviousPort = this.itinerary.ports.indexOf(
        this.previousPort
      )

      const indexOfNextPort = indexOfPreviousPort + 1
      this.currentPort = this.itinerary.ports.at(indexOfNextPort)
      this.currentPort.addShip(this)

      this.hasCompletedItinerary = this.itinerary.ports.length - indexOfNextPort <= 0
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Ship
  } else {
    window.Ship = Ship
  }
})()
