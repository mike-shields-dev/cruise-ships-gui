const { Ship } = require("../src/Ship")
const { Port } = require("../src/Port")

describe("Ship", () => {
  it("can be instantiated", () => {
    const ship = new Ship()

    expect(ship).toBeInstanceOf(Ship)
    expect(ship).toBeInstanceOf(Object)
  })

  it("has a currentPort", () => {
    const port = new Port("Liverpool")
    const ship = new Ship(port)

    expect(ship.currentPort).toBe(port)
  })

  it("can set sail", () => {
    const ship = new Ship("Liverpool")
    expect(ship.setSail).toBeInstanceOf(Function)

    ship.setSail()
    expect(ship.currentPort).toBeFalsy()
  })

  it("can dock at a port", () => {
    const port = new Port("Liverpool")
    const ship = new Ship()

    ship.dock(port)
    expect(ship.currentPort).toBe(port)
  })
})
