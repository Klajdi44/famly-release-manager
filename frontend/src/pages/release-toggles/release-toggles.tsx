import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Loader,
  Paper,
  Switch,
  Title,
} from "@mantine/core";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { useFetch } from "../../hooks/use-fetch/use-fetch";
import jwtAxios from "../../util/axios/axiosInstance";
import { ReleaseToggle } from "../types/release-toggle/apitypes";
import ReleaseToggleModal, { OnSubmitParams } from "./modal/modal";

const realeseTogglesUrl = "/v1/release-toggles";

type ReleaseTogglesProps = {
  releaseToggles: ReleaseToggle[];
};

const ReleaseToggles = ({ releaseToggles }: ReleaseTogglesProps) => {
  const [isAddNewToggleOpened, setIsAddNewToggleOpened] = useState(false);

  const toggleModalVisibility = () =>
    setIsAddNewToggleOpened(prevState => !prevState);

  const handleAddToggle = ({ name, description }: OnSubmitParams) => {
    jwtAxios.post("/v1/release-toggles", {
      name,
      description,
      userId: 1,
    });

    toggleModalVisibility();
  };

  console.log(releaseToggles);

  return (
    <Container>
      {/* Button that opens the add  toggle modal */}
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

      {/* Release toggle modals */}
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {releaseToggles.map(toggle => (
          <Fragment key={toggle.id}>
            <Flex justify={"space-between"} align="center" m={"md"}>
              <Link to={"#"}>
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
    return (
      <Center h={"80%"}>
        <Loader />
      </Center>
    );
  }

  if ((error && error !== "canceled") || data === null) {
    return <div>Something went wrong... please try again</div>;
  }

  return <ReleaseToggles releaseToggles={data} />;
};

export default DataLoader;
