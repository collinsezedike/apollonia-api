import assert from "assert";
import supertest from "supertest";

import { URL_PATH } from ".";
import buildApp from "../../app";
import { connectDB, DATABASE_URI, disconnectDB } from "../../config";

const app = buildApp();

before(() => {
  connectDB(DATABASE_URI!);
});

describe("Get All Departments", () => {
  it("returns status code 200", async () => {
    const response = await supertest(app).get(URL_PATH);
    assert(response.statusCode === 200);
  });

  it("returns a data array", async () => {
    const response = await supertest(app).get(URL_PATH);
    assert(Array.isArray(response.body.data) === true);
  });
});

after(() => {
  disconnectDB();
});
