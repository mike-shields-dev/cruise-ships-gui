const { Ship } = require("../src/Ship")
const { Port } = require("../src/Port")
const { Itinerary } = require("../src/Itinerary")

describe("Ship", () => {
  const firstPort = new Port("Liverpool")
  const secondPort = new Port("Dublin")
  const lastPort = new Port("New York")
  const itinerary = new Itinerary([firstPort, secondPort, lastPort])

  it("can be instantiated", () => {
    const ship = new Ship(itinerary)

    expect(ship).toBeInstanceOf(Ship)
    expect(ship).toBeInstanceOf(Object)
  })

  it("has a previousPort", () => {
    const ship = new Ship(itinerary)

    expect(ship).toHaveProperty("previousPort")
  })

  it("previousPort is initialised to null", () => {
    const ship = new Ship(itinerary)

    expect(ship.previousPort).toBeNull()
  })

  it("has a currentPort property", () => {
    const ship = new Ship(itinerary)

    expect(ship).toHaveProperty("currentPort")
  })

  it("currentPort is initialised to the first port in the itinerary", () => {
    const ship = new Ship(itinerary)

    expect(ship.currentPort).toBe(firstPort)
  })

  it("ship gets added to ships array of currentPort at instantiation", () => {
    const ship = new Ship(itinerary)

    expect(firstPort.ships).toContain(ship)
  })

  it("has a setSail method", () => {
    const ship = new Ship(itinerary)

    expect(ship.setSail).toBeInstanceOf(Function)
  })

  it("setSail throws an error if the ship is not docked", () => {
    const ship = new Ship(itinerary)
    ship.currentPort = null

    expect(() => ship.setSail()).toThrowError("The ship is not docked")
  })

  it("setSail sets currentPort to null", () => {
    const ship = new Ship(itinerary)

    ship.setSail()

    expect(ship.currentPort).toBeNull()
  })

  it("setSail removes ship from ports array of previousPort", () => {
    const ship = new Ship(itinerary)

    ship.setSail()

    expect(firstPort.ships).not.toContain(ship)
  })

  it("ship can't setSail when at last port in itinerary", () => {
    const ship = new Ship(itinerary)

    expect(ship.currentPort).toBe(firstPort)

    ship.setSail()
    ship.dock()

    expect(ship.currentPort).toBe(secondPort)

    ship.setSail()
    ship.dock()

    expect(ship.currentPort).toBe(lastPort)

    expect(() => ship.setSail()).toThrowError(
      "The ship has arrived at its final destination"
    )
  })

  it("has a dock method", () => {
    const ship = new Ship(itinerary)

    expect(ship.dock).toBeInstanceOf(Function)
  })

  it("dock throws an error if the ship is already docked", () => {
    const ship = new Ship(itinerary)

    expect(() => ship.dock()).toThrowError("Ship is already docked")
  })

  it("dock sets currentPort to the next port in the itinerary", () => {
    const ship = new Ship(itinerary)

    ship.setSail()
    ship.dock()

    expect(ship.currentPort).toBe(secondPort)
  })

  it("dock adds ship to ships array of currentPort", () => {
    const ship = new Ship(itinerary)

    ship.setSail()
    ship.dock()

    expect(secondPort.ships).toContain(ship)
  })
})
