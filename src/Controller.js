;(function () {
  function Controller() {
    this.initialiseSea()
  }

  Controller.prototype.initialiseSea = function initialiseSea() {
    const viewport = document.querySelector("#viewport")
    const waterImages = ["../images/water0.png", "../images/water1.png"]
    const animationInterval = 1000
    let waterImageIndex = 0
    let timeStamp = Date.now()

    ;(function step() {
      const currentTime = Date.now()
      if (currentTime - timeStamp > animationInterval) {
        timeStamp = currentTime
        viewport.style.backgroundImage = `url(${waterImages[waterImageIndex]})`
        waterImageIndex = ++waterImageIndex % waterImages.length
      }
      requestAnimationFrame(step)
    })()
  }

  Controller.prototype.renderPorts = function renderPorts(ports) {
    const portsEl = document.querySelector("#ports")
    portsEl.style.width = `${ports.length * 256}px`

    ports.forEach((port, index) => {
      const portEl = document.createElement("div")
      portEl.className = "port"
      portEl.dataset.portIndex = index
      portsEl.appendChild(portEl)
    })
  }

  Controller.prototype.positionShip = function positionShip(ship) {
    const indexOfCurrentPort = ship.itinerary.ports.findIndex(
      (port) => port.name === ship.currentPort.name
    )

    const portEl = document.querySelector(
      `.port[data-port-index="${indexOfCurrentPort}"]`
    )

    const { offsetLeft, offsetTop } = portEl
    const portElOffsetTop = portEl.offsetTop
    const shipEl = document.querySelector("#ship")
    const { 
      width: shipElWidth, 
      height: shipElHeight 
    } = getComputedStyle(shipEl) 

    shipEl.style.top = `${offsetTop + parseInt(shipElHeight) / 2}px`
    shipEl.style.left = `${offsetLeft - parseInt(shipElWidth) / 4}px`
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller
  } else {
    window.Controller = Controller
  }
})()
