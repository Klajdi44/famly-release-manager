import { Flex, Title, Switch, Tooltip } from "@mantine/core";
import { IconClockHour4, IconTrash } from "@tabler/icons";
import { Link } from "react-router-dom";
import { Text } from "@mantine/core";

import { ReleaseToggle } from "../../../types/apitypes";
import { ChangeEvent } from "react";

type Props = {
  toggle: ReleaseToggle;
  onDelete: (
    // eslint-disable-next-line no-unused-vars
    toggleId: ReleaseToggle["id"]
  ) => () => Promise<void>;
  onChange: (isChecked: boolean) => Promise<void>;
};

const ReleaseToggleLink = ({ toggle, onDelete, onChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <Flex justify={"space-between"} align="center" m={"md"}>
      <Link
        to={{
          pathname: "/release-toggle",
          search: `?toggle-id=${toggle.id}`,
        }}
      >
        <Title data-testid="toggleName" fz="xl">
          {toggle.name}
        </Title>
      </Link>
      {toggle.release?.date && (
        <Tooltip
          label={`scheduled to be released on ${new Date(
            toggle.release.date
          ).toLocaleDateString()} ${new Date(
            toggle.release.date
          ).toLocaleTimeString()}`}
          position="top"
        >
          <div>
            <IconClockHour4 />
          </div>
        </Tooltip>
      )}
      <Flex align="end" gap="sm">
        <Switch
          checked={toggle.isActive}
          color="teal"
          onLabel="On"
          offLabel="Off"
          size="lg"
          data-testid="switch"
          onChange={handleChange}
        />
        <Tooltip
          label="Delete release toggle"
          withinPortal
          withArrow
          position="bottom-start"
          onClick={onDelete(toggle.id)}
        >
          <Text>
            <IconTrash data-testid="deleteIcon" />
          </Text>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default ReleaseToggleLink;
