import request from "supertest";
import { app } from "@shared/infra/http/app";


describe("Should be able to create a new category", async () => {

  it("test", async () => {
    const response = await request(app)
      .post("/category/")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest"
      });
    expect(response.status).toBe(201);
  });

});