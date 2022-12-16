import { getUser } from "../../util/auth";

describe("Test behaviour of the function that gets a user from localstorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const mockTokens = {
    access:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJrbGFqZGlAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJLbGFqZGkiLCJsYXN0TmFtZSI6IkFqZGluaSIsImlhdCI6MTY3MTEzMzQ5NywiZXhwIjoxNjcxMTM0MDk3fQ.lMke4gNsF3h1L1nCvRKizHVDnHwCGaVxjLPriM4QmD70S5GOM9SNgPOi29bpsBRpNEw-gEAzPiscJY_BS4wBboJpgBppXJ0H0oQdpUKS4Hu2t6NhwEUEJTjEV3r7_dxZHvaJNNCLVZF3OUc8r7_jQhpkVcLuMxk2E4kiBgLnT1EoI-8n-vuKOYuuOQH0aGPqWV972Ej89tZudQ6ZHdXpmyvgBU5P2tF5MHl-EtO4JbR6fVUkEKBNlSI4J1Z-Jd3tRPPUEjAtOrl5OzqsJPmKr1K7UbW0iiQCI1WoSE31_5mi6n-lAhIrG7Who9i7TWB0JmF9dAhQfzNm2QmzJfQ0CA",
    refresh:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJrbGFqZGlAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJLbGFqZGkiLCJsYXN0TmFtZSI6IkFqZGluaSIsImlhdCI6MTY3MTEzMzQ5NywiZXhwIjozMzE5NzE3NTg5N30.ZuRmfJVkFh-td1-w88IMVTpJyXVpMlyzG4IBzeYzQZGA15JgjKYddXzAUxWyK5EF-MCnk5ejs8MpWaQx7gIjr0pv1AvgOJjpeGDxL2PsdZQbXRx4lNLMdiFamBdAxH8EXQUF8T-GWrOm_kB0QkgiZk2TvhPDTmU873GKMdJ591Q56rI3T8OH0An2NB69nlrRS1fYpBtejr3jYOufjUplk56Coa5YLzZc9amwpPAmjK-RK5rV5TWHOYacroM9Yr2NCI-80bxPg4yIYy-iKF02sLHn0OYIwCMGQgsyjPQlzGKsEfw1wBuEWaUW720cVYaP2V2KW9znSvl-3iZllir8ow",
  };

  test("It should not return a user if there is nothing in the local storage", () => {
    expect(getUser()).toBeNull();
  });

  test("It should be able to decode a jwt and retrieve the user from it", () => {
    expect(getUser()).toBeNull();

    window.localStorage.setItem("userTokens", JSON.stringify(mockTokens));

    expect(getUser()).not.toBeNull();
    expect(Object.keys(getUser() ?? {}).length).toBe(2);

    const decodedToken = getUser();

    expect(decodedToken?.user.firstName).toEqual("Klajdi");
    expect(decodedToken?.user.lastName).toEqual("Ajdini");
    expect(decodedToken?.user.id).toEqual(2);

    expect(decodedToken?.token).toEqual(mockTokens);
  });
});

export {};
