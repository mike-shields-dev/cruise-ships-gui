;(function () {
  class Controller {
    constructor({
      ship,
      sailBttn,
      currentPortDisplayEl,
      nextPortDisplayEl,
      viewportEl,
      messageEl,
    }) {
      this.ship = ship

      this.sailBttn = sailBttn
      this.shipEl = null
      this.currentPortDisplayEl = currentPortDisplayEl
      this.nextPortDisplayEl = nextPortDisplayEl
      this.viewportEl = viewportEl
      this.shipContainerEl = document.querySelector("#ship-container")
      this.messageEl = messageEl

      this.addListenerSailBttn()
      this.addListenerMessageEl()
      this.updateHeader()
    }

    addListenerSailBttn() {
      this.sailBttn.addEventListener("click", () => this.setSail())
    }

    addListenerShipEl() {
      this.shipEl.addEventListener("transitionstart", () => {
        this.renderMessage(`🧭 Departed from ${this.ship.previousPort.name} 🧭`)
        this.shipEl.className = "rocking"
        this.ship.isSailing = true
      })

      this.shipEl.addEventListener("transitionend", () => {
        this.renderMessage(`⚓ Arrived at ${this.ship.currentPort.name} ⚓`)
        if (this.ship.currentPort === this.ship.itinerary.ports.at(-1)) {
          this.ship.hasCompletedItinerary = true
        }
        this.shipEl.className = "shifting"
        this.ship.isSailing = false
        this.updateHeader()
      })
    }

    addListenerMessageEl() {
      this.messageEl.addEventListener("transitionend", () => {
        if (this.ship.hasCompletedItinerary) {
          ;[...bookingForm.elements].forEach((el) => (el.disabled = false))
          this.sailBttn.textContent = "🏁 Your cruise is complete! 🏁"
          this.sailBttn.disabled = true
          document.querySelector("#port-input").focus()
          itineraryListEl.value = ""
          portNames = []
        } else if (this.ship.isSailing) {
          this.sailBttn.textContent = "Sailing..."
        } else {
          this.sailBttn.textContent = "Set Sail!"
        }
      })
    }

    setSail() {
      this.ship.setSail()
      this.ship.dock()
      this.moveShipEl()
    }

    renderPorts(ports) {
      const root = document.querySelector(":root")
      root.style.setProperty("--portsElWidth", `${ports.length * 600}px`)

      ports.forEach((port, index) => {
        const portEl = document.createElement("div")
        portEl.className = "port"
        portEl.dataset.portIndex = index
        portsEl.appendChild(portEl)
      })
    }

    renderShipEl() {
      this.shipEl = createShipElement()
      this.shipContainerEl.innerHTML = ""
      this.shipContainerEl.appendChild(this.shipEl)
      this.moveShipEl()
      this.addListenerShipEl()
      this.initScrollTracking()
      this.sailBttn.textContent = "Set Sail!"
      this.sailBttn.disabled = false
    }

    renderShark() {
      const sharkEl = document.createElement("div")
      sharkEl.id = "shark"

      const sharkElInner = document.createElement("div")
      sharkElInner.id = "shark-inner"

      sharkEl.appendChild(sharkElInner)
      this.viewportEl.appendChild(sharkEl)
    }

    moveShipEl() {
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

    initScrollTracking(shipEl = this.shipEl, viewportEl = this.viewportEl) {
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

    renderMessage(message) {
      this.messageEl.textContent = message
      this.messageEl.style.opacity = 1
      setTimeout(() => (this.messageEl.style.opacity = 0), 2000)
    }

    updateHeader() {
      this.currentPortDisplayEl.textContent = this.ship.currentPort.name
      const currentPortIndex = this.ship.itinerary.ports.findIndex(
        (port) => port.name === this.ship.currentPort.name
      )
      const nextPortIndex = currentPortIndex + 1
      const nextPort = this.ship.itinerary.ports.at(nextPortIndex)

      if (nextPort) {
        this.nextPortDisplayEl.textContent = nextPort.name
      } else {
        this.nextPortDisplayEl.textContent = "-------------"
      }
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller
  } else {
    window.Controller = Controller
  }
})()
