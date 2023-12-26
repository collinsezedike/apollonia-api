import assert from "assert";
import supertest from "supertest";

import { DEPARTMENT_URL_PATH, URL_PATH } from ".";
import buildApp from "../../app";
import { connectDB, DATABASE_URI, disconnectDB } from "../../config";
import { isStaff } from "../../utils";

const app = buildApp();

before(() => {
  connectDB(DATABASE_URI!);
});

describe("Add New Staff", () => {
  describe("Successfully added new staff", () => {
    const newStaff = { name: "James", surname: "Smith", department_id: "" };
    beforeEach(async () => {
      const response = await supertest(app).get(DEPARTMENT_URL_PATH);
      newStaff.department_id = response.body.data[0]._id;
    });

    it("returns status code 201", async () => {
      const response = await supertest(app).post(URL_PATH).send(newStaff);
      assert(response.statusCode === 201);
    });

    it("returns a staff object", async () => {
      const response = await supertest(app).post(URL_PATH).send(newStaff);
      assert(isStaff(response.body.data));
    });
  });
  describe("Unsuccessfully added new staff", () => {
    it("returns status code 400: missing required request body field", async () => {
      const response = await supertest(app).post(URL_PATH).send({});
      assert(response.statusCode === 400);
    });
  });
});

after(() => {
  disconnectDB();
});
