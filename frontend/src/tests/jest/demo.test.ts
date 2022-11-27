const demoFunction = (x: number, y: number) => x + y;

describe("Test a demo function", () => {
  it("Should return 4", () => {
    const result = demoFunction(2, 2);
    expect(result).toEqual(4);
  });
});

export {};
