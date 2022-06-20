const { Port } = require("../src/Port")

describe("Port", () => {
  it("can be instantiated", () => {
    const port = new Port()
    expect(port).toBeInstanceOf(Port)
    expect(port).toBeInstanceOf(Object)
  })

  it("has a name property that can be set at instantiation", () => {
    const port = new Port("Liverpool")
    expect(port.name).toBe("Liverpool")
  })

  it("has a ships property", () => {
    const port = new Port()
    expect(port).toHaveProperty("ships")
  })

  it("ships property is initialised as an empty array", () => {
    const port = new Port()
    expect(port.ships).toEqual([])
  })

  it("has an addShip method", () => {
    const port = new Port()
    expect(port.addShip).toBeInstanceOf(Function)
  })

  it("addShip adds the given ship to the ships array", () => {
    const port = new Port()
    const ship = { name: "Boaty McBoatface" }
    port.addShip(ship)
    expect(port.ships).toContain(ship)
  })

  it("has removeShip method", () => {
    const port = new Port()

    expect(port.removeShip).toBeInstanceOf(Function)
  })

  it("removeShip throws an error if the ships array is empty", () => {
    const port = new Port()

    expect(() => port.removeShip()).toThrowError("No ships to remove")
  })

  it("removeShip removes the given ship from the ships array", () => {
    const port = new Port()
    const ship1 = { name: "Boaty McBoatface" }
    const ship2 = { name: "The Black Pearl" }
    
    port.addShip(ship1)
    port.addShip(ship2)

    port.removeShip(ship1)

    expect(port.ships).not.toContain(ship1)
  })
})
