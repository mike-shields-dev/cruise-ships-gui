let portNames = []
let itinerary
let ship
let controller
const bookingForm = document.querySelector("form")
const addPortButton = document.querySelector("#add-port-button")
const itineraryListEl = document.querySelector("#itinerary-list")
const portsEl = document.querySelector("#ports")
const shipEl = createShipElement()
const sailBttn = document.querySelector("#sail-button")
const currentPortDisplayEl = document.querySelector("#current-port-display")
const nextPortDisplayEl = document.querySelector("#next-port-display")
const viewportEl = document.querySelector("#viewport")
const messageEl = document.querySelector("#message")

addPortButton.addEventListener("click", (e) => {
  e.preventDefault()
  const portName = form.port.value
    .toLowerCase()
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ")
    .trim()

  if (!portName || portNames.includes(portName)) {
    alert("Port already exists")
    return
  } else {
    portNames.push(portName)
  }
  bookingForm.port.focus()
  bookingForm.port.value = ""
  itineraryListEl.value = ""
  portNames.forEach((portName) => {
    itineraryListEl.value += portName + "\n"
  })
})

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault()
  if (portNames.length < 2) {
    alert("You must add at least two ports")
    return
  }
  ;[...bookingForm.elements].forEach((el) => (el.disabled = true))
  bookingForm.port.value = ""
  portsEl.innerHTML = ""
  itinerary = new Itinerary(portNames.map((portName) => new Port(portName)))
  ship = new Ship(itinerary)

  controller = new Controller({
    ship,
    shipEl,
    sailBttn,
    currentPortDisplayEl,
    nextPortDisplayEl,
    viewportEl,
    messageEl,
  })

  controller.renderPorts(itinerary.ports)
  controller.positionShip(ship)
})
