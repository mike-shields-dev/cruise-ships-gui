;(function () {
  function Controller(ship) {
    this.ship = ship
    this.setSailButton = document.querySelector("#sail-button")
    this.setSailButton.addEventListener("click", () => this.setSail())

    this.shipEl = document.querySelector("#ship")
    this.shipEl.addEventListener("transitionstart", () => {
      this.renderMessage(`🧭 Departed from ${this.ship.previousPort.name} 🧭`)
      this.shipEl.className = "rock"
      this.shipEl.children[0].className = "bob"
      this.ship.isSailing = true
    })

    this.shipEl.addEventListener("transitionend", () => {
      this.renderMessage(`⚓ Arrived at ${this.ship.currentPort.name} ⚓`)
      if (this.ship.currentPort === this.ship.itinerary.ports.at(-1)) {
        this.ship.hasCompletedItinerary = true
      }
      this.shipEl.className = "shift"
      this.shipEl.children[0].className = "bob"
      this.ship.isSailing = false
      this.updateHeader()
    })

    this.viewportEl = document.querySelector("#viewport")

    this.messageEl = document.querySelector("#message")
    this.messageEl.addEventListener("transitionend", () => {
      if(this.ship.hasCompletedItinerary) {
        [...form.elements].forEach(el => el.disabled = false)
        this.setSailButton.textContent = "🏁 Your cruise is complete! 🏁"
        this.setSailButton.disabled = true
      } else if (this.ship.isSailing) {
        this.setSailButton.textContent = "Sailing..."
      } else {
        this.setSailButton.textContent = "Set Sail!"
      }
    })

    this.currentPortEl = document.querySelector('#current-port')
    this.nextPortEl = document.querySelector('#next-port')

    this.initialiseScrollTracking()
    this.updateHeader()
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

  Controller.prototype.updateHeader = function updateHeader() {
    this.currentPortEl.textContent = this.ship.currentPort.name
    const currentPortIndex = this.ship.itinerary.ports.findIndex(
      (port) => port.name === this.ship.currentPort.name
    )
    const nextPortIndex = currentPortIndex + 1
    const nextPort = this.ship.itinerary.ports.at(nextPortIndex)

    if(nextPort) {
      this.nextPortEl.textContent = nextPort.name
    } else {
      this.nextPortEl.textContent = "-------------"
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller
  } else {
    window.Controller = Controller
  }
})()
