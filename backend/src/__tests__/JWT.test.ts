// const fs = require("fs");
// const path = require("path");
// const sign = require("jsonwebtoken").sign;
// const generateToken = require("../../api/utils/jwt.utils");

// describe("generateToken", () => {
//   beforeEach(() => {
//     // Set up a mock for the fs.readFileSync function to return a fixed value
//     fs.readFileSync = jest.fn().mockReturnValue("mock-private-key");
//   });

//   afterEach(() => {
//     // Reset the mock after each test
//     fs.readFileSync.mockReset();
//   });

//   test("it generates an access token with the correct payload and options", () => {
//     const token = generateToken();
//     const signMock = sign.mock.calls[0];
//     const payload = signMock[0];
//     const options = signMock[2];
//     expect(payload).toEqual({
//       email: "Andrei Mihutoni",
//       id: 123,
//     });
//     expect(options.algorithm).toBe("RS256");
//     expect(options.expiresIn).toBe("10m");
//   });

//   test("it generates a refresh token with the correct payload and options", () => {
//     const token = generateToken("refresh");
//     const signMock = sign.mock.calls[0];
//     const payload = signMock[0];
//     const options = signMock[2];
//     expect(payload).toEqual({
//       email: "Andrei Mihutoni",
//       id: 123,
//     });
//     expect(options.algorithm).toBe("RS256");
//     expect(options.expiresIn).toBe("999y");
//   });

//   test("it generates a token with a custom payload", () => {
//     const token = generateToken(null, { foo: "bar" });
//     const signMock = sign.mock.calls[0];
//     const payload = signMock[0];
//     expect(payload).toEqual({ foo: "bar" });
//   });
// });
