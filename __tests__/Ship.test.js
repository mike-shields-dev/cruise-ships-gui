const { Ship } = require("../src/Ship");

describe('Ship', () => {
  it('can be instantiated', () => {
    const ship = new Ship()
    expect(ship).toBeInstanceOf(Ship)
    expect(ship).toBeInstanceOf(Object)
  });

  it('has a startingPort', () => {
    const ship = new Ship("Liverpool");
    expect(ship.startingPort).toBe("Liverpool");
  });
});
