import { ChangeEvent, useMemo, useState } from "react";
import {
  Button,
  Flex,
  Modal,
  MultiSelect,
  NativeSelect,
  Radio,
} from "@mantine/core";
import * as ApiTypes from "../../types/apitypes";

type OnSubmitParams = ApiTypes.RulesPayload;

type Props = {
  isVisible: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (params: OnSubmitParams) => void;
  segments: ApiTypes.Segment[];
};

const AddSegmentToReleaseToggleModal = ({
  onClose,
  onSubmit,
  isVisible,
  segments,
}: Props) => {
  const [appliedSegments, setAppliedSegments] = useState<string[]>([]);

  const segmentNames = useMemo(
    () => segments.map(segment => segment.title),
    [segments]
  );

  console.log(appliedSegments);

  const resetState = () => {
    setAppliedSegments([]);
  };

  const handleAppliedSegmentsChange = (appliedSegmentNames: string[]) => {
    // const selectedSegment = segments.find(
    //   segment => segment.title === event.target.value
    // );

    // if (selectedSegment === undefined) {
    //   return;
    // }

    // const segment = { id: selectedSegment.id };

    setAppliedSegments(appliedSegmentNames);
  };

  const handleSubmit = async () => {
    if (appliedSegments === undefined) {
      return;
    }

    // onSubmit();
    resetState();
  };

  const handleClose = () => {
    onClose();
    resetState();
  };

  return (
    <Modal
      size="100%"
      opened={isVisible}
      onClose={handleClose}
      title="Add segments to release toggle"
    >
      <Flex gap="xl" wrap="wrap" align="center" justify="start">
        <MultiSelect
          value={appliedSegments}
          data={segmentNames}
          onChange={handleAppliedSegmentsChange}
          placeholder="Segments"
          description="Pick segments to add"
        />
      </Flex>

      <Button mt={20} variant="filled" onClick={handleSubmit}>
        Submit
      </Button>
    </Modal>
  );
};

export default AddSegmentToReleaseToggleModal;
