import { useState } from "react";
import { Button, Modal, TextInput } from "@mantine/core";

type OnSubmitParams = {
  title: string;
  description: string;
};

type Props = {
  isVisible: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: ({ title, description }: OnSubmitParams) => void;
};

const SegmentsModal = ({ onClose, onSubmit, isVisible }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit({ title, description });
  };

  return (
    <Modal opened={isVisible} onClose={onClose} title="Add new segment">
      <TextInput
        label="Title"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
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

export default SegmentsModal;
export type { OnSubmitParams };
