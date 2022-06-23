let portNames = []
let itinerary
let ship
let controller
const form = document.querySelector("form")
const addPortButton = document.querySelector("#add-port-button")
const itineraryListEl = document.querySelector("#itinerary-list")
const portsEl = document.querySelector("#ports")

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

  itineraryListEl.value = ""
  portNames.forEach((portName) => {
    itineraryListEl.value += portName + "\n"
  })
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (portNames.length < 2) {
    alert("You must add at least two ports")
    return
  }
  ;[...form.elements].forEach((el) => (el.disabled = true))
  form.port.value = ""
  portsEl.innerHTML = ""
  itineraryListEl.value = ""
  itinerary = new Itinerary(portNames.map((portName) => new Port(portName)))
  ship = new Ship(itinerary)
  controller = new Controller(ship)

  controller.renderPorts(itinerary.ports)
  controller.positionShip(ship)
})
