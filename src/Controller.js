;(function () {
  function Controller(ship) {
    this.ship = ship
    this.setSailButton = document.querySelector("#sail-button")
    this.setSailButton.addEventListener("click", () => this.setSail())

    this.shipEl = document.querySelector("#ship")
    this.viewportEl = document.querySelector("#viewport")
    this.setSailButton = document.querySelector("#sail-button")
    this.setSailButton.addEventListener("click", () => this.setSail())
    this.initialiseSea()
    this.initialiseScrollTracking()
  }

  Controller.prototype.initialiseSea = function initialiseSea() {
    const waterImages = ["../images/water0.png", "../images/water1.png"]
    const animationInterval = 1000
    let waterImageIndex = 0
    let timeStamp = Date.now()

    ;(function step() {
      const currentTime = Date.now()
      if (currentTime - timeStamp > animationInterval) {
        timeStamp = currentTime
        this.viewport.style.backgroundImage = `url(${waterImages[waterImageIndex]})`
        waterImageIndex = ++waterImageIndex % waterImages.length
      }
      requestAnimationFrame(step)
    })()
  }

  Controller.prototype.renderPorts = function renderPorts(ports) {
    const portsEl = document.querySelector("#ports")
    portsEl.style.width = `${ports.length * 600}px`

    ports.forEach((port, index) => {
      const portEl = document.createElement("div")
      portEl.className = "port"
      portEl.dataset.portIndex = index
      portsEl.appendChild(portEl)
    })
  }

  Controller.prototype.positionShip = function positionShip() {
    const indexOfCurrentPort = this.ship.itinerary.ports.findIndex(
      (port) => port.name === this.ship.currentPort.name
    )

    const portEl = document.querySelector(
      `.port[data-port-index="${indexOfCurrentPort}"]`
    )

    const { offsetLeft, offsetTop } = portEl
    const portElOffsetTop = portEl.offsetTop
    const shipEl = document.querySelector("#ship")
    const { width: shipElWidth, height: shipElHeight } =
      getComputedStyle(shipEl)

    shipEl.style.top = `${offsetTop + parseInt(shipElHeight) / 2}px`
    shipEl.style.left = `${offsetLeft - parseInt(shipElWidth) / 4}px`
  }

  Controller.prototype.setSail = function setSail() {
    this.ship.setSail()
    this.ship.dock()
    this.positionShip()
  }

  Controller.prototype.initialiseScrollTracking =
    function initialiseScrollTracking(
      shipEl = this.shipEl,
      viewportEl = this.viewportEl
    ) {
      let shipElPrevOffset

      const trackScroll = () => {
        const { left: shipElNextOffset } = getComputedStyle(shipEl)
        if (shipElPrevOffset !== shipElNextOffset) {
          viewportEl.scrollTo({
            left: parseInt(shipElNextOffset) - 10,
          })
          shipElPrevOffset = shipElNextOffset
        }
        requestAnimationFrame(trackScroll)
      }
      requestAnimationFrame(trackScroll)
    }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller
  } else {
    window.Controller = Controller
  }
})()
