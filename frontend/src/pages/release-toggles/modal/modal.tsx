import { useState } from "react";
import { Button, Modal, TextInput } from "@mantine/core";

type OnSubmitParams = {
  name: string;
  description: string;
};

type Props = {
  isVisible: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: ({ name, description }: OnSubmitParams) => void;
};

const ReleaseToggleModal = ({ onClose, onSubmit, isVisible }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit({ name, description });
  };

  return (
    <Modal opened={isVisible} onClose={onClose} title="New Release Toggle">
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

      <Button mt={20} variant="filled" onClick={handleSubmit}>
        Submit
      </Button>
    </Modal>
  );
};

export default ReleaseToggleModal;
export type { OnSubmitParams };
