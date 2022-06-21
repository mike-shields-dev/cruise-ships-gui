const { Ship } = require("../src/Ship")
const { Port } = require("../src/Port")
const { Itinerary } = require("../src/Itinerary")

describe("Ship", () => {
  describe("with ports and an itinerary", () => {
    let firstPort, secondPort, lastPort, itinerary, ship
    
    beforeEach(() => {
      firstPort = new Port("Liverpool")
      secondPort = new Port("Dublin")
      lastPort = new Port("New York")
      itinerary = new Itinerary([firstPort, secondPort, lastPort])
      ship = new Ship(itinerary)
    })

    it("can be instantiated", () => {
      expect(ship).toBeInstanceOf(Ship)
      expect(ship).toBeInstanceOf(Object)
    })
  
    it("has a previousPort", () => {
      expect(ship).toHaveProperty("previousPort")
    })
  
    it("previousPort is initialised to null", () => {  
      expect(ship.previousPort).toBeNull()
    })
  
    it("has a currentPort property", () => {  
      expect(ship).toHaveProperty("currentPort")
    })
  
    it("currentPort is initialised to the first port in the itinerary", () => {  
      expect(ship.currentPort).toBe(firstPort)
    })
  
    it("ship gets added to ships array of currentPort at instantiation", () => {  
      expect(firstPort.ships).toContain(ship)
    })
  
    it("has a setSail method", () => {  
      expect(ship.setSail).toBeInstanceOf(Function)
    })
  
    it("setSail throws an error if the ship is not docked", () => {
      ship.currentPort = null  
      expect(() => ship.setSail()).toThrowError("The ship is not docked")
    })
  
    it("setSail sets currentPort to null", () => {
      ship.setSail()
      expect(ship.currentPort).toBeNull()
    })
  
    it("setSail removes ship from ports array of previousPort", () => {
      ship.setSail()
      expect(firstPort.ships).not.toContain(ship)
    })
  
    it("ship can't setSail when at last port in itinerary", () => {
      ship.currentPort = lastPort
      expect(() => ship.setSail()).toThrowError(
        "The ship has arrived at its final destination"
      )
    })
  
    it("has a dock method", () => {
      expect(ship.dock).toBeInstanceOf(Function)
    })
  
    it("dock throws an error if the ship is already docked", () => {
      expect(() => ship.dock()).toThrowError("Ship is already docked")
    })
  
    it("dock sets currentPort to the next port in the itinerary", () => {
      ship.setSail()
      ship.dock()
      expect(ship.currentPort).toBe(secondPort)
    })
  
    it("dock adds ship to ships array of currentPort", () => {
      ship.setSail()
      ship.dock()
      expect(secondPort.ships).toContain(ship)
    })
  })
})
