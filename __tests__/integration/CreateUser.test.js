import pkg from '@prisma/client';
import request from "supertest";
import app from "../../src/shared/infra/http/app.js";

const { PrismaClient } = pkg;
const prisma = new PrismaClient()

describe( "Create User", () => {

      afterAll(async () => {
            await prisma.user.deleteMany({ where: {}})
      })
      
      it("Should be able to create a new user" , async () => {

            const response = await request(app).post("/user").send({
                name :"User test",
                email : "test@gmail.com",
                password:"12345"
            })

            expect(response.status).toBe(200)
      })

      it("Should not to be able to create a user with a existing email" , async () => {

            const response = await request(app).post("/user").send({
                name :"User test",
                email : "test@gmail.com",
                password:"12345"
            })

            expect(response.status).toBe(400)
      })

     
})