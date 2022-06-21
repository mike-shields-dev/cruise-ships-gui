const { Port } = require("../src/Port")

describe("Port", () => {
  let port, ship1, ship2

  beforeEach(() => {
    port = new Port("Liverpool")
    ship1 = jest.fn()
    ship2 = jest.fn()
  })

  it("can be instantiated", () => {
    expect(port).toBeInstanceOf(Port)
    expect(port).toBeInstanceOf(Object)
  })

  it("has a name property that can be set at instantiation", () => {
    expect(port.name).toBe("Liverpool")
  })

  it("has a ships property", () => {
    expect(port).toHaveProperty("ships")
  })

  it("ships property is initialised as an empty array", () => {
    expect(port.ships).toEqual([])
  })

  it("has an addShip method", () => {
    expect(port.addShip).toBeInstanceOf(Function)
  })

  it("addShip adds the given ship to the ships array", () => {
    const ship1 = jest.fn()
    port.addShip(ship1)

    expect(port.ships).toContain(ship1)
  })

  it("has removeShip method", () => {
    expect(port.removeShip).toBeInstanceOf(Function)
  })

  it("removeShip throws an error if the ships array is empty", () => {
    expect(() => port.removeShip()).toThrowError("No ships to remove")
  })

  it("removeShip removes the given ship from the ships array", () => {
    port.addShip(ship1)
    port.addShip(ship2)
    
    port.removeShip(ship1)

    expect(port.ships).not.toContain(ship1)
    expect(port.ships).toContain(ship2)
  })
})
