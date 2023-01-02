import { getColorScheme } from "../../util/auth";

describe("getColorScheme", () => {
  it("should return 'dark' when the color scheme in local storage is null", () => {
    const localStorageMock = jest.spyOn(Storage.prototype, "setItem");

    expect(getColorScheme()).toBe("dark");

    localStorageMock.mockRestore();
  });

  it("should return 'dark' when the color scheme in local storage is not 'dark' or 'light'", () => {
    const localStorageMock = jest.spyOn(Storage.prototype, "getItem");
    localStorageMock.mockReturnValue("Not light or dark");

    expect(getColorScheme()).toBe("dark");

    localStorageMock.mockRestore();
  });

  it("should return 'light' when the color scheme in local storage is 'light'", () => {
    const localStorageMock = jest.spyOn(Storage.prototype, "getItem");
    localStorageMock.mockReturnValue("light");

    expect(getColorScheme()).toBe("light");

    localStorageMock.mockRestore();
  });

  it("should return 'dark' when the color scheme in local storage is 'dark'", () => {
    const localStorageMock = jest.spyOn(Storage.prototype, "getItem");
    localStorageMock.mockReturnValue("dark");

    expect(getColorScheme()).toBe("dark");

    localStorageMock.mockRestore();
  });
});
