import { Fragment, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Flex,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import CenteredLoader from "../../components/centered-loader/centered-loader";
import { useFetch } from "../../hooks/use-fetch/use-fetch";
import * as ApiTypes from "../types/apitypes";
import jwtAxios from "../../util/axios/axiosInstance";
import SegmentsModal, { OnSubmitParams } from "./modal/modal";
import { useGlobalState } from "../../hooks/use-global-state/use-global-state";

const SEGMENTS_URL = "v1/segments";

type SegmentsProps = {
  segments: ApiTypes.Segment[];
};

const Segments = ({ segments }: SegmentsProps) => {
  const [state] = useGlobalState();
  const [isAddSegmentModalVisible, setIsAddSegmentModalVisible] =
    useState(false);

  const hasSegments = segments.length > 0;

  const toggleAddSegmentModalVisibility = () =>
    setIsAddSegmentModalVisible(prevState => !prevState);

  const handleAddSegment = ({ title, description }: OnSubmitParams) => {
    jwtAxios.post(SEGMENTS_URL, {
      title,
      description,
      userId: state.user?.id,
    });

    toggleAddSegmentModalVisibility();
  };

  return hasSegments ? (
    <Container>
      <Flex align="center" justify="space-between">
        <Title>Segments</Title>
        <Button onClick={toggleAddSegmentModalVisibility}>Add segment</Button>
      </Flex>

      {/* Modal */}
      <SegmentsModal
        isVisible={isAddSegmentModalVisible}
        onSubmit={handleAddSegment}
        onClose={toggleAddSegmentModalVisibility}
      />

      {/* segments */}
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {segments.map(segment => (
          <Fragment key={segment.id}>
            <Flex justify={"space-between"} align="center" m={"md"}>
              <Link
                to={{
                  pathname: "/segment",
                  search: `?id=${segment.id}`,
                }}
              >
                <Title fz="xl">{segment.title}</Title>
              </Link>
            </Flex>
            <Divider />
          </Fragment>
        ))}
      </Paper>
    </Container>
  ) : (
    <Text>No segments found</Text>
  );
};

const Loader = () => {
  const { data, error, isLoading } = useFetch<ApiTypes.Segment[]>({
    url: SEGMENTS_URL,
  });

  if (isLoading) {
    return <CenteredLoader />;
  }

  if ((error && error !== "canceled") || data === null) {
    return <Text>Error: Something went wrong... please try again</Text>;
  }

  if (isLoading === false && data === null) {
    return <Text>Error: Could not fetch segments</Text>;
  }

  return <Segments segments={data} />;
};

export default Loader;
