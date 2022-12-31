import {
  Button,
  Container,
  Divider,
  Flex,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons";
import { AxiosResponse } from "axios";
import { Fragment, useCallback, useState } from "react";

import CenteredLoader from "../../components/centered-loader/centered-loader";
import { useFetch } from "../../hooks/use-fetch/use-fetch";
import { useGlobalState } from "../../hooks/use-global-state/use-global-state";
import jwtAxios from "../../util/axios/axiosInstance";
import { ReleaseToggle } from "../types/apitypes";
import ReleaseToggleModal, { OnSubmitParams } from "./components/modal/modal";
import ReleaseToggleLink from "./components/release-toggle-link/release-toggle-link";

const RELEASE_TOGGLE_URL = "/v1/release-toggles";

type ReleaseTogglesProps = {
  releaseToggles: ReleaseToggle[];
  refetch: () => Promise<AxiosResponse>;
};

const ReleaseToggles = ({ releaseToggles, refetch }: ReleaseTogglesProps) => {
  const [state] = useGlobalState();
  const [isAddNewToggleOpened, setIsAddNewToggleOpened] = useState(false);

  const { fetchData: createSegment } = useFetch({
    url: RELEASE_TOGGLE_URL,
    method: "post",
    lazy: true,
  });

  const { fetchData: toggleReleaseToggle } = useFetch({
    url: `${RELEASE_TOGGLE_URL}/toggle-release-toggle`,
    method: "patch",
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

  const handleReleaseToggleChange = useCallback(
    (toggleId: ReleaseToggle["id"]) => async (isActive: boolean) => {
      console.log({ isActive, toggleId });
      await toggleReleaseToggle({
        id: toggleId,
        isActive,
      });

      refetch();
    },
    [toggleReleaseToggle, refetch]
  );

  return (
    <Container size="xl">
      {/* Button that opens the add toggle modal */}
      <Flex align="center" justify="space-between">
        <Title>Release toggles</Title>
        <Button leftIcon={<IconCirclePlus />} onClick={toggleModalVisibility}>
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
            <ReleaseToggleLink
              toggle={toggle}
              onDelete={handleDeleteReleaseToggle}
              onChange={handleReleaseToggleChange(toggle.id)}
            />
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
