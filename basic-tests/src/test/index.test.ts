import { multiply, sum } from "../index";
import { describe, expect, it } from "@jest/globals";

describe("sum", () => {
  it("should add 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("should add 2 + 2 to equal 4", () => {
    expect(sum(2, 2)).toBe(4);
  });

  it("should add 4 + 4 to equal 8", () => {
    expect(sum(4, 4)).toBe(8);
  });
});

// describe, it, expect

describe("multiply", () => {
  it("should multiply 2 * 2 to equal 4", () => {
    expect(multiply(2, 2)).toBe(4);
  });

  it("should multiply 4 * 4 to equal 16", () => {
    expect(multiply(4, 4)).toBe(16);
  });

  it("should multiply 6 * 6 to equal 36", () => {
    expect(multiply(6, 6)).toBe(36);
  });
});
