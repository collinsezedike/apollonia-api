import assert from "assert";
import mongoose from "mongoose";
import supertest from "supertest";

import { DEPARTMENT_URL_PATH, URL_PATH } from ".";
import buildApp from "../../app";
import { connectDB, DATABASE_URI, disconnectDB } from "../../config";
import { isStaff } from "../../utils";

const app = buildApp();

before(() => {
  connectDB(DATABASE_URI!);
});

describe("Update staff By Id", () => {
  describe("Staff exists", () => {
    let staffId: string;
    const updateData = { name: "Jameson", department_id: "" };

    beforeEach(async () => {
      const departmentResponse = await supertest(app).get(DEPARTMENT_URL_PATH);
      updateData.department_id = departmentResponse.body.data[0]._id;

      const staffResponse = await supertest(app).get(URL_PATH);
      const lastStaffIndex = staffResponse.body.data?.length - 1;
      staffId = staffResponse.body.data[lastStaffIndex]._id;
    });

    it("returns status code 200", async () => {
      const response = await supertest(app)
        .put(`${URL_PATH}/${staffId}`)
        .send(updateData);
      assert(response.statusCode === 200);
    });

    it("returns a staff object", async () => {
      const response = await supertest(app)
        .put(`${URL_PATH}/${staffId}`)
        .send(updateData);
      assert(isStaff(response.body.data));
    });
  });

  describe("Staff does not exists", () => {
    it("returns status code 404", async () => {
      const arbitraryId = new mongoose.Types.ObjectId();
      const response = await supertest(app).put(`${URL_PATH}/${arbitraryId}`);
      assert(response.statusCode === 404);
    });
  });

  describe("Missing or invalid request parameters", () => {
    it("returns status code 500: staff id is invalid", async () => {
      const invalid_ids = [0, 1, "001", "a1", null, true, undefined];
      for (const id of invalid_ids) {
        const response = await supertest(app).put(`${URL_PATH}/${id}`);
        assert(response.statusCode === 500);
      }
    });
  });
});

after(() => {
  disconnectDB();
});
