import { Button, Modal } from "@mantine/core";
import { useState } from "react";

type OnSubmitParams = { date: Date };

type Props = {
  isVisible: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (params: OnSubmitParams) => void;
};

const ScheduleReleaseModal = ({ onClose, onSubmit, isVisible }: Props) => {
  const [scheduleDate, setScheduleDate] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = async () => {
    if (scheduleDate === undefined) {
      return;
    }

    onSubmit({ date: new Date(scheduleDate) });
    setScheduleDate(undefined);
  };

  const handleClose = () => {
    onClose();
  };

  const handleScheduleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleDate(e.target.value);
  };

  const isScheduleReleaseButtonDisabled = scheduleDate === undefined;

  return (
    <Modal
      size="100%"
      opened={isVisible}
      onClose={handleClose}
      title="Schedule a time and date for this release toggle to be released!"
    >
      <div>
        <input
          type="datetime-local"
          value={scheduleDate}
          onChange={handleScheduleDateChange}
        />
      </div>

      <Button
        mt={20}
        variant="filled"
        onClick={handleSubmit}
        disabled={isScheduleReleaseButtonDisabled}
      >
        Schedule release
      </Button>
    </Modal>
  );
};

export default ScheduleReleaseModal;
export type { OnSubmitParams };
