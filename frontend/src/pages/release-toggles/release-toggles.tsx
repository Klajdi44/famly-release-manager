import {
  Button,
  Container,
  Divider,
  Flex,
  Paper,
  Switch,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { Fragment, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import CenteredLoader from "../../components/centered-loader/centered-loader";
import { useFetch } from "../../hooks/use-fetch/use-fetch";
import { useGlobalState } from "../../hooks/use-global-state/use-global-state";
import jwtAxios from "../../util/axios/axiosInstance";
import { ReleaseToggle } from "../types/apitypes";
import ReleaseToggleModal, { OnSubmitParams } from "./modal/modal";

const RELEASE_TOGGLE_URL = "/v1/release-toggles";

type ReleaseTogglesProps = {
  releaseToggles: ReleaseToggle[];
  refetch: () => Promise<void>;
};

const ReleaseToggles = ({ releaseToggles, refetch }: ReleaseTogglesProps) => {
  const [state] = useGlobalState();
  const [isAddNewToggleOpened, setIsAddNewToggleOpened] = useState(false);

  const { fetchData: createSegment } = useFetch({
    url: RELEASE_TOGGLE_URL,
    method: "post",
    lazy: true,
  });

  const toggleModalVisibility = () =>
    setIsAddNewToggleOpened(prevState => !prevState);

  const handleAddToggle = async ({ name, description }: OnSubmitParams) => {
    await createSegment({
      name,
      description,
      userId: state.user?.id,
    });

    await refetch();

    toggleModalVisibility();
  };

  const handleDeleteReleaseToggle = useCallback(
    (toggleId: ReleaseToggle["id"]) => async () => {
      await jwtAxios.delete(`${RELEASE_TOGGLE_URL}/${toggleId}`);
      await refetch();
    },
    []
  );

  return (
    <Container>
      {/* Button that opens the add toggle modal */}
      <Flex justify="end">
        <Button variant="filled" onClick={toggleModalVisibility}>
          Add release toggle
        </Button>
      </Flex>

      {/*Add new toggle modal */}
      <ReleaseToggleModal
        isVisible={isAddNewToggleOpened}
        onClose={toggleModalVisibility}
        onSubmit={handleAddToggle}
      />

      {/* Release toggles */}
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {releaseToggles.map(toggle => (
          <Fragment key={toggle.id}>
            <Flex justify={"space-between"} align="center" m={"md"}>
              <Link
                to={{
                  pathname: "/release-toggle",
                  search: `?toggle-id=${toggle.id}`,
                }}
              >
                <Title fz="xl">{toggle.name}</Title>
              </Link>
              <Flex align="end" gap="sm">
                <Switch color="teal" onLabel="On" offLabel="Off" size="lg" />
                <Tooltip
                  label="Delete release toggle"
                  withinPortal
                  withArrow
                  position="bottom-start"
                  onClick={handleDeleteReleaseToggle(toggle.id)}
                >
                  <Text>
                    <IconTrash />
                  </Text>
                </Tooltip>
              </Flex>
            </Flex>
            <Divider />
          </Fragment>
        ))}
      </Paper>
    </Container>
  );
};

const DataLoader = () => {
  const {
    data,
    error,
    isLoading,
    fetchData: refetch,
  } = useFetch<ReleaseToggle[]>({
    url: RELEASE_TOGGLE_URL,
  });

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (isLoading === false && error) {
    return <div>Something went wrong... please try again</div>;
  }

  if (data === null) {
    return isLoading === false && error ? (
      <Text>Error: Could not fetch segments</Text>
    ) : null;
  }

  return <ReleaseToggles releaseToggles={data} refetch={refetch} />;
};

export default DataLoader;
export { ReleaseToggles };
