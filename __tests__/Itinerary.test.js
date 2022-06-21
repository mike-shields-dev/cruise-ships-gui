const { Itinerary } = require("../src/Itinerary")
const { Port } = require("../src/Port")

describe("Itinerary", () => {
  it("can be instantiated", () => {
    const itinerary = new Itinerary()
    
    expect(itinerary).toBeInstanceOf(Object)
    expect(itinerary).toBeInstanceOf(Itinerary)
  })

  it("can have ports", () => {
    const port1 = jest.fn()
    const port2 = jest.fn()
    const itinerary = new Itinerary([port1, port2])
    
    expect(itinerary.ports).toEqual([port1, port2])
  })
})
