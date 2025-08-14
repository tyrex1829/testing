import { describe, it, expect } from "@jest/globals";
import { app } from "../index";
import request from "supertest";

describe("GET /", () => {
  it("should return the server status", async () => {
    const res = await request(app).get("/");

    console.log(res);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Server is Up");
  });
});

describe("GET /ping", () => {
  it("should return pong", async () => {
    const res = await request(app).get("/ping");

    console.log(res);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Pong");
  });
});

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    console.log(res);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBe(`Answer: 3`);
  });
});
