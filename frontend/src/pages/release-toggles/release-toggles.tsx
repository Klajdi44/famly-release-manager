import { Button, Container, Modal, Paper, TextInput } from "@mantine/core";
import { useState } from "react";
import { useFetch } from "../../hooks/use-fetch/use-fetch";
import jwtAxios from "../../util/axios/axiosInstance";

const realeseTogglesUrl = "/v1/release-toggles";

const ReleaseToggles = () => {
  const [isAddNewToggleOpened, setIsAddNewToggleOpened] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data, error, isLoading } = useFetch({
    url: realeseTogglesUrl,
  });

  console.log({ data });

  const handleAddToggle = () => {
    jwtAxios.post("/v1/release-toggles", {
      name,
      description,
      userId: 1,
    });
  };

  return (
    <Container>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Button variant="filled" onClick={() => setIsAddNewToggleOpened(true)}>
          Add release toggle
        </Button>

        <Modal
          opened={isAddNewToggleOpened}
          onClose={() => setIsAddNewToggleOpened(false)}
          title="New Release Toggle"
        >
          <TextInput
            label="Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <TextInput
            label="Description"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />

          <Button mt={20} variant="filled" onClick={handleAddToggle}>
            Submit
          </Button>
        </Modal>
      </Paper>
    </Container>
  );
};

export default ReleaseToggles;
