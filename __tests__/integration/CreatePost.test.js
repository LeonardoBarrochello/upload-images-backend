import pkg from '@prisma/client';
import request from "supertest";
import app from "../../src/shared/infra/http/app.js";
import { resolve , dirname } from "path"
import { fileURLToPath } from 'url';
import { UserService } from '../../src/services/UserService.js';

const _dirname_ = dirname(fileURLToPath(import.meta.url))

const { PrismaClient } = pkg;
const prisma = new PrismaClient()

describe( "Upload Image ", () => {
      let userService;
      beforeEach(() => {
             userService = new UserService()
      })
      afterAll(async () => {
            await prisma.post.deleteMany({ where: {}})
            await prisma.user.deleteMany({ where :{}})
      })
      it("Should be able to upload a image and save info in database" , async () => {

            await userService.create("User test","testuser@email.com","12345")
           
            const responseAuth = await request(app).post("/user/token/session").send({
                  email : "testuser@email.com",
                  password : "12345"
            })

            const {access_token} = responseAuth.body

            const response = await request(app).post("/image").attach('file' , resolve(_dirname_ , 'images' , 'banana.jpg') )
            .set({
                  Authorization : `Bearer ${access_token}`
            })

            expect(response.status).toBe(201)

      })

    
})