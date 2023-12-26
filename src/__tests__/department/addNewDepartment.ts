import assert from "assert";
import supertest from "supertest";

import { URL_PATH } from ".";
import buildApp from "../../app";
import { connectDB, DATABASE_URI, disconnectDB } from "../../config";
import { isDepartment } from "../../utils";

const app = buildApp();

before(() => {
  connectDB(DATABASE_URI!);
});

describe("Add New Department", () => {
  describe("Successfully added new department", () => {
    const newDepartment = { name: "Clinical" };
    it("returns status code 201", async () => {
      const response = await supertest(app).post(URL_PATH).send(newDepartment);
      assert(response.statusCode === 201);
    });

    it("returns a department object", async () => {
      const response = await supertest(app).post(URL_PATH).send(newDepartment);
      assert(isDepartment(response.body.data));
    });
  });
  describe("Unsuccessfully added new department", () => {
    it("returns status code 400: missing required request body field", async () => {
      const response = await supertest(app).post(URL_PATH).send({});
      assert(response.statusCode === 400);
    });
  });
});

after(() => {
  disconnectDB();
});
