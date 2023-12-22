import request from "supertest";
import assert from "assert";

import buildApp from "../app";

const app = buildApp();

describe("app", () => {
  it("base url returns status code 200: app is running", async () => {
    const response = await request(app).get("/");
    assert(response.status === 200);
  });
});
