import swaggerAutogen from "swagger-autogen";

import { SERVER_URL } from ".";

const doc = {
  info: {
    version: "1.0.0",
    title: "Apollonia API",
    description:
      "A fundamental employee management CRUD web app to store information about employees and departments at Apollonia Dental Practice, and perform CRUD operations on the employee data, using Node.js and MongoDB.",
  },
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  servers: [{ url: `${SERVER_URL}` }],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "Authorization", // name of the header, query parameter or cookie
    },
  },
  definitions: {
    Department: {
      name: "Clinical",
    },
    Staff: {
      name: "John",
      surname: "Doe",
      department: {
        $ref: "#/definitions/Department",
      },
    },
  },
};

const outputFile = "./swagger.json";
const routes = ["./../app.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
