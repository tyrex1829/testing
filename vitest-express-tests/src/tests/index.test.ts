import { describe, it, expect, vi } from "vitest";
import { app } from "../index";
import request from "supertest";

vi.mock("../db", () => ({
  prismaClient: { sum: { create: vi.fn() } },
}));

describe("GET /", () => {
  it("should return server state", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe(`Server is UP`);
  });
});

describe("GET /sum", () => {
  it("should return sum of two numbers in get", async () => {
    const res = await request(app)
      .get("/sum")
      .set({
        a: "1",
        b: "2",
      })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app).get("/sum").send();

    expect(res.statusCode).toBe(411);
    expect(res.body.msg).toBe("Incorrect inputs");
  });
});

describe("POST /sum", () => {
  it("should return sum of two numbers in post", async () => {
    const res = await request(app).post("/sum").send({
      a: 2,
      b: 2,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(4);
  });

  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app).post("/sum").send({});

    expect(res.statusCode).toBe(411);
    expect(res.body.msg).toBe("Incorrect inputs");
  });
});
