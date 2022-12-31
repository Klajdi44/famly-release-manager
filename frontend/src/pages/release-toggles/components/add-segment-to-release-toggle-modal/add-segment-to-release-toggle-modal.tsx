import { useMemo, useState } from "react";
import { Button, Flex, Modal, MultiSelect } from "@mantine/core";
import * as ReleaseToggleTransformers from "../../transformers";
import * as ApiTypes from "../../../types/apitypes";

type OnSubmitParams = { id: ApiTypes.Segment["id"] }[];

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

  const segmentTitles = useMemo(
    () => segments.map(segment => segment.title),
    [segments]
  );

  const resetState = () => {
    setAppliedSegments([]);
  };

  const handleAppliedSegmentsChange = (appliedSegmentNames: string[]) => {
    setAppliedSegments(appliedSegmentNames);
  };

  const handleSubmit = async () => {
    if (appliedSegments.length === 0) {
      return;
    }

    onSubmit(
      ReleaseToggleTransformers.transformDomainSegmentsToApiSegments(
        appliedSegments,
        segments
      )
    );
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
          data={segmentTitles}
          onChange={handleAppliedSegmentsChange}
          placeholder="Segments"
          description="Pick segments to add"
        />
      </Flex>

      <Button mt={20} variant="filled" onClick={handleSubmit}>
        Add
      </Button>
    </Modal>
  );
};

export default AddSegmentToReleaseToggleModal;
export type { OnSubmitParams };
