import { render, screen } from "../test-util";
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
    isActive: false,
    release: {},
  };

  const refetch = jest.fn();

  it("Should have a button that allows you to add a release toggle", () => {
    render(
      <ReleaseToggles
        releaseToggles={[releaseToggle, { ...releaseToggle, id: 2 }]}
        refetch={refetch}
      />
    );

    const button = screen.getByRole("button", {
      name: /Add release toggle/,
    });

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("Should render 2 release toggles", () => {
    render(
      <ReleaseToggles
        releaseToggles={[
          releaseToggle,
          { ...releaseToggle, id: 2, name: "Release toggle 2" },
        ]}
        refetch={refetch}
      />
    );

    const releaseToggles = screen.getAllByTestId("toggleName");

    expect(releaseToggles.length).toEqual(2);
  });

  it("Should be able to render delete buttons", async () => {
    render(
      <ReleaseToggles
        releaseToggles={[
          releaseToggle,
          { ...releaseToggle, id: 2, name: "Release toggle 2" },
        ]}
        refetch={refetch}
      />
    );

    const deleteIcons = screen.getAllByTestId("deleteIcon");
    expect(deleteIcons.length).toEqual(2);
  });

  it("Should be able to render and interact switch buttons", async () => {
    render(
      <ReleaseToggles
        releaseToggles={[
          { ...releaseToggle, isActive: true },
          { ...releaseToggle, id: 2, name: "Release toggle 2" },
        ]}
        refetch={refetch}
      />
    );

    const switches = screen.getAllByTestId("switch");
    expect(switches.length).toEqual(2);

    const firstSwitchButton = switches[0];
    const secondSwitchButton = switches[1];

    expect(firstSwitchButton).toBeChecked();
    expect(secondSwitchButton).not.toBeChecked();
  });
});

export {};
