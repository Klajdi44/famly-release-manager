import { fireEvent, render, screen } from "@testing-library/react";
import { ReleaseToggles } from "../../../pages/release-toggles/release-toggles";
import * as ApiTypes from "../../../pages/types/apitypes";

describe("Release toggles page", () => {
  const releaseToggle: ApiTypes.ReleaseToggle = {
    id: 1,
    name: "Release toggle 1",
    description: "some description",
    releaseAt: "some date",
    createdAt: "some date",
    updatedAt: "some date",
    userId: null,
    segments: [],
    user: null,
  };

  const refetch = jest.fn();

  it("Should have a button that allows you to add a release toggle", () => {
    render(
      <ReleaseToggles
        releaseToggles={[releaseToggle, releaseToggle]}
        refetch={refetch}
      />
    );

    const button = screen.getByRole("button", {
      name: /Add release toggle/,
    });

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    // fireEvent.change(email, { target: { value: "testEmail" } });
    // expect(button).toBeDisabled();

    // fireEvent.change(password, { target: { value: "testPassword" } });
    // expect(button).toBeEnabled();
  });
});

export {};
