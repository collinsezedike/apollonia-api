import assert from "assert";
import mongoose from "mongoose";
import supertest from "supertest";

import { URL_PATH } from ".";
import buildApp from "../../app";
import { connectDB, DATABASE_URI, disconnectDB } from "../../config";

const app = buildApp();

before(() => {
  connectDB(DATABASE_URI!);
});

describe("Department", () => {
  describe("Delete Department By Id", () => {
    describe("Department exists", () => {
      let departmentId: string;
      beforeEach(async () => {
        const response = await supertest(app).get(URL_PATH);
        const lastItemIndex = response.body.data?.length - 1;
        departmentId = response.body.data[lastItemIndex]._id;
      });

      it("returns status code 200", async () => {
        const response = await supertest(app).delete(
          `${URL_PATH}/${departmentId}`
        );
        assert(response.statusCode === 200);
      });
    });

    describe("Department does not exists", () => {
      it("returns status code 404", async () => {
        const arbitraryId = new mongoose.Types.ObjectId();
        const response = await supertest(app).delete(
          `${URL_PATH}/${arbitraryId}`
        );
        assert(response.statusCode === 404);
      });
    });

    describe("Missing or invalid request parameters", () => {
      it("returns status code 500: department id is invalid", async () => {
        const invalid_ids = [0, 1, "001", "a1", null, true, undefined];
        for (const id of invalid_ids) {
          const response = await supertest(app).delete(`${URL_PATH}/${id}`);
          assert(response.statusCode === 500);
        }
      });
    });
  });
});

after(() => {
  disconnectDB();
});
