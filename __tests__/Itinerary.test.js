const { Itinerary } = require("../src/Itinerary")
const { Port } = require("../src/Port")

describe("Itinerary", () => {
  it("can be instantiated", () => {
    const itinerary = new Itinerary()
    
    expect(itinerary).toBeInstanceOf(Object)
    expect(itinerary).toBeInstanceOf(Itinerary)
  })

  it("can have ports", () => {
    const port1 = new Port("Liverpool")
    const port2 = new Port("Dublin")
    const itinerary = new Itinerary([port1, port2])
    
    expect(itinerary.ports).toEqual([port1, port2])
  })
})
