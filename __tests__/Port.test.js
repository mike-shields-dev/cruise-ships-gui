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
})
