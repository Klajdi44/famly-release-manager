import { decodeJwt } from "../../util/auth";

describe("Test behaviour of the function decodeJwt that is responsible to decode and return a user from a jwt token", () => {
  const accessToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJrbGFqZGlAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJLbGFqZGkiLCJsYXN0TmFtZSI6IkFqZGluaSIsImlhdCI6MTY3MTEzMzQ5NywiZXhwIjoxNjcxMTM0MDk3fQ.lMke4gNsF3h1L1nCvRKizHVDnHwCGaVxjLPriM4QmD70S5GOM9SNgPOi29bpsBRpNEw-gEAzPiscJY_BS4wBboJpgBppXJ0H0oQdpUKS4Hu2t6NhwEUEJTjEV3r7_dxZHvaJNNCLVZF3OUc8r7_jQhpkVcLuMxk2E4kiBgLnT1EoI-8n-vuKOYuuOQH0aGPqWV972Ej89tZudQ6ZHdXpmyvgBU5P2tF5MHl-EtO4JbR6fVUkEKBNlSI4J1Z-Jd3tRPPUEjAtOrl5OzqsJPmKr1K7UbW0iiQCI1WoSE31_5mi6n-lAhIrG7Who9i7TWB0JmF9dAhQfzNm2QmzJfQ0CA";

  test("It should return a user", () => {
    const user = decodeJwt(accessToken);

    expect(user.firstName).toBe("Klajdi");
    expect(user.email).toBe("klajdi@example.com");
    expect(user.id).toBe(2);
    expect(user.exp).toBe(1671134097);
  });
});
