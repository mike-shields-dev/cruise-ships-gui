;(function () {
  function Controller(ship) {
    this.ship = ship
    this.setSailButton = document.querySelector("#sail-button")
    this.setSailButton.addEventListener("click", () => this.setSail())

    this.shipEl = document.querySelector("#ship")
    this.shipEl.addEventListener("transitionstart", () => {
      this.renderMessage(`🧭 Departed from ${this.ship.previousPort.name} 🧭`)
      this.ship.isSailing = true
    })

    this.shipEl.addEventListener("transitionend", () => {
      this.renderMessage(`⚓ Arrived at ${this.ship.currentPort.name} ⚓`)
      this.ship.isSailing = false
    })

    this.viewportEl = document.querySelector("#viewport")

    this.messageEl = document.querySelector("#message")
    this.messageEl.addEventListener("transitionend", () => {
      if(this.ship.hasCompletedItinerary) {
        this.setSailButton.textContent = "🏁 Your cruise is complete! 🏁"
        this.setSailButton.disabled = true
      } else if (this.ship.isSailing) {
        this.setSailButton.textContent = "Sailing..."
      } else {
        this.setSailButton.textContent = "Set Sail!"
      }
    })
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

  Controller.prototype.renderMessage = function renderMessage(message) {
    this.messageEl.textContent = message
    this.messageEl.style.opacity = 1

    setTimeout(() => (this.messageEl.style.opacity = 0), 2000)
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller
  } else {
    window.Controller = Controller
  }
})()
