import assert from "assert";
import mongoose from "mongoose";
import supertest from "supertest";

import buildApp from "../app";
import { connectDB, DATABASE_URI, disconnectDB } from "../config";
import { isDepartment } from "../utils";

const URL_PATH = "/api/v1/departments";

const app = buildApp();

describe("Department", () => {
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

  describe("Add New Department", () => {
    describe("Successfully added new department", () => {
      const newDepartment = { name: "Clinical" };
      it("returns status code 201", async () => {
        const response = await supertest(app)
          .post(URL_PATH)
          .send(newDepartment);
        assert(response.statusCode === 201);
      });

      it("returns a department object", async () => {
        const response = await supertest(app)
          .post(URL_PATH)
          .send(newDepartment);
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

  describe("Get Department By Id", () => {
    describe("Department exists", () => {
      let departmentId: string;
      beforeEach(async () => {
        const response = await supertest(app).get(URL_PATH);
        departmentId = response.body.data[0]._id;
      });

      it("returns status code 200", async () => {
        const response = await supertest(app).get(
          `${URL_PATH}/${departmentId}`
        );
        assert(response.statusCode === 200);
      });

      it("returns a department object", async () => {
        const response = await supertest(app).get(
          `${URL_PATH}/${departmentId}`
        );
        assert(isDepartment(response.body.data));
      });
    });

    describe("Department does not exists", () => {
      it("returns status code 404", async () => {
        const arbitraryId = new mongoose.Types.ObjectId();
        const response = await supertest(app).get(`${URL_PATH}/${arbitraryId}`);
        assert(response.statusCode === 404);
      });
    });

    describe("Missing or invalid request parameters", () => {
      it("returns status code 500: department id is invalid", async () => {
        const invalid_ids = [0, 1, "001", "a1", null, true, undefined];
        for (const id of invalid_ids) {
          const response = await supertest(app).get(`${URL_PATH}/${id}`);
          assert(response.statusCode === 500);
        }
      });
    });
  });

  describe("Update Department By Id", () => {
    describe("Department exists", () => {
      const updateData = { name: "Hospital" };

      let departmentId: string;
      beforeEach(async () => {
        const response = await supertest(app).get(URL_PATH);
        const lastItemIndex = response.body.data?.length - 1;
        departmentId = response.body.data[lastItemIndex]._id;
      });

      it("returns status code 200", async () => {
        const response = await supertest(app)
          .put(`${URL_PATH}/${departmentId}`)
          .send(updateData);
        assert(response.statusCode === 200);
      });

      it("returns a department object", async () => {
        const response = await supertest(app)
          .put(`${URL_PATH}/${departmentId}`)
          .send(updateData);
        assert(isDepartment(response.body.data));
      });
    });

    describe("Department does not exists", () => {
      it("returns status code 404", async () => {
        const arbitraryId = new mongoose.Types.ObjectId();
        const response = await supertest(app).put(`${URL_PATH}/${arbitraryId}`);
        assert(response.statusCode === 404);
      });
    });

    describe("Missing or invalid request parameters", () => {
      it("returns status code 500: department id is invalid", async () => {
        const invalid_ids = [0, 1, "001", "a1", null, true, undefined];
        for (const id of invalid_ids) {
          const response = await supertest(app).put(`${URL_PATH}/${id}`);
          assert(response.statusCode === 500);
        }
      });
    });
  });

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

  after(() => {
    disconnectDB();
  });
});
