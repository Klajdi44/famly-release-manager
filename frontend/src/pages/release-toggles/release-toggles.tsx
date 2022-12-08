import {
  Button,
  Center,
  Container,
  Loader,
  Modal,
  Paper,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
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

  const handleToggleModal = () =>
    setIsAddNewToggleOpened(prevState => !prevState);

  const handleAddToggle = ({ name, description }: OnSubmitParams) => {
    jwtAxios.post("/v1/release-toggles", {
      name,
      description,
      userId: 1,
    });

    handleToggleModal();
  };

  console.log(releaseToggles);

  return (
    <Container>
      {/* <Paper withBorder shadow="md" p={30} mt={30} radius="md"> */}
      <Button variant="filled" onClick={() => setIsAddNewToggleOpened(true)}>
        Add release toggle
      </Button>

      <ReleaseToggleModal
        isVisible={isAddNewToggleOpened}
        onClose={handleToggleModal}
        onSubmit={handleAddToggle}
      />
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
