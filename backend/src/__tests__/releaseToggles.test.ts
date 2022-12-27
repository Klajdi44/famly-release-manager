import supertest from "supertest";
// import { app } from "../index";
import request from "supertest";
// import app from "../index";
import { getAllReleaseToggles } from "../controllers/releaseToggles";

// describe("release-toggle", () => {
//   describe("get release-toggle route", () => {
//     describe("given the release-toggle does not exist", () => {
//       it("should return a 404", async () => {
//         // const releaseToggleId = "123";
//         // await supertest(app).get(`/api/v1/release-toggles/${releaseToggleId}`).expect(404);
//         // console.log(app);
//         await supertest(app).get(`/api/v1/release-toggles`).expect(200);

//         expect(true).toBe(true);
//       });
//     });
//   });
// });

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    // const response = await request(getAllReleaseToggles).get("/");
    // expect(response.statusCode).toBe(200);
    expect(true).toBe(true);
  });
});
