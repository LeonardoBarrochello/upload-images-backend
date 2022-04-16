
import  pkg  from '@prisma/client';
import request from "supertest";
import { UserService } from '../../src/services/UserService.js';
import app from "../../src/shared/infra/http/app.js";


const { PrismaClient } = pkg
const  prisma = new PrismaClient()


describe( "Authenticate user ", () => {
      let userService ;
      beforeEach( async () => {
            userService = new UserService();
      })
      
      afterAll(async () => {
         await prisma.user.deleteMany({ where :{}})
      })
      it("Should be able to authenticate a user" , async () => {

            await userService.create("test user", "test@email.com" , "12345")

            const response = await request(app).post("/user/token/session").send( {
                email : "test@email.com",
                password : "12345"
            })


            expect(response.body).toHaveProperty("access_token")
            expect(response.body).toHaveProperty("user")
            expect(response.status).toBe(200)

      })

})