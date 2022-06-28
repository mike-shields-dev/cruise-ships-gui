function createShipElement() {
  const shipEl = document.createElement("div")
  shipEl.id = "ship"
  shipEl.className = "shifting"

  const shipInnerEl = document.createElement("div")
  shipInnerEl.id = "ship-inner"
  shipInnerEl.className = "bobbing"

  shipEl.appendChild(shipInnerEl)

  return shipEl
}