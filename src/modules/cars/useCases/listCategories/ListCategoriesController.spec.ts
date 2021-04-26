import request from "supertest";
import { app } from "@shared/infra/http/app";
import { v4 as uuid } from "uuid"
import { hash } from "bcrypt";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("List Category Controller", () => {

 beforeAll(async () => {
  connection = await createConnection();
  await connection.runMigrations();

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
   `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
   values('${id}','admin','list@rentx.com.br','${password}',true,'now()','XXXXXXX')
   `
  );
 });

 afterAll(async () => {
  await connection.dropDatabase();
  await connection.close();
 });

 it("Should be able to list all categories", async () => {

  const responseToken = await request(app).post("/sessions")
   .send({
    email: "list@rentx.com.br",
    password: "admin"
   });

  const { token } = responseToken.body;
  console.log(token)
  const categoria = await request(app)
   .post("/categories")
   .send({
    name: "Category SuperTest1",
    description: "Category SuperTest1"
   }).set({
    Authorization: `Bearer ${token}`
   });

  console.log(categoria.body);

  const response = await request(app).get("/categories");

  console.log(response.body);

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0]).toHaveProperty("id");
  expect(response.body[0].name).toEqual("Category Supertest1");
 });
});