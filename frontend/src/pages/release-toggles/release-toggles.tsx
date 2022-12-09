import {
  Button,
  Container,
  Divider,
  Flex,
  Paper,
  Switch,
  Title,
} from "@mantine/core";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import CenteredLoader from "../../components/centered-loader/centered-loader";
import { useFetch } from "../../hooks/use-fetch/use-fetch";
import { useGlobalState } from "../../hooks/use-global-state/use-global-state";
import jwtAxios from "../../util/axios/axiosInstance";
import { ReleaseToggle } from "../types/release-toggle/apitypes";
import ReleaseToggleModal, { OnSubmitParams } from "./modal/modal";

const realeseTogglesUrl = "/v1/release-toggles";

type ReleaseTogglesProps = {
  releaseToggles: ReleaseToggle[];
};

const ReleaseToggles = ({ releaseToggles }: ReleaseTogglesProps) => {
  const [state] = useGlobalState();
  const [isAddNewToggleOpened, setIsAddNewToggleOpened] = useState(false);

  const toggleModalVisibility = () =>
    setIsAddNewToggleOpened(prevState => !prevState);

  const handleAddToggle = ({ name, description }: OnSubmitParams) => {
    jwtAxios.post("/v1/release-toggles", {
      name,
      description,
      userId: state.user?.id,
    });

    toggleModalVisibility();
  };

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
              <Switch color="teal" onLabel="On" offLabel="Off" size="lg" />
            </Flex>
            <Divider />
          </Fragment>
        ))}
      </Paper>
    </Container>
  );
};

const DataLoader = () => {
  const { data, error, isLoading } = useFetch<ReleaseToggle[]>({
    url: realeseTogglesUrl,
  });

  if (isLoading) {
    return <CenteredLoader />;
  }

  if ((error && error !== "canceled") || data === null) {
    return <div>Something went wrong... please try again</div>;
  }

  return <ReleaseToggles releaseToggles={data} />;
};

export default DataLoader;
