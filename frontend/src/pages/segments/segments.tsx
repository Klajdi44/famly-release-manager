import { Fragment, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Flex,
  Paper,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { Link } from "react-router-dom";
import CenteredLoader from "../../components/centered-loader/centered-loader";
import { useFetch } from "../../hooks/use-fetch/use-fetch";
import * as ApiTypes from "../types/apitypes";
import jwtAxios from "../../util/axios/axiosInstance";
import SegmentsModal, { OnSubmitParams } from "./components/modal/modal";
import { useGlobalState } from "../../hooks/use-global-state/use-global-state";
import { IconCirclePlus, IconTrash } from "@tabler/icons";
import { useCallback } from "react";
import { AxiosResponse } from "axios";

const SEGMENTS_URL = "v1/segments";

type SegmentsProps = {
  segments: ApiTypes.Segment[];
  refetch: () => Promise<AxiosResponse>;
};

const Segments = ({ segments, refetch }: SegmentsProps) => {
  const [state] = useGlobalState();
  const [isAddSegmentModalVisible, setIsAddSegmentModalVisible] =
    useState(false);

  const { fetchData: createSegment } = useFetch({
    url: SEGMENTS_URL,
    method: "post",
    lazy: true,
  });

  const hasSegments = segments.length > 0;

  const toggleAddSegmentModalVisibility = () =>
    setIsAddSegmentModalVisible(prevState => !prevState);

  const handleAddSegment = async ({ title, description }: OnSubmitParams) => {
    await createSegment({
      title,
      description,
      userId: state.user?.id,
    });

    await refetch();

    toggleAddSegmentModalVisibility();
  };

  const handleDeleteSegment = useCallback(
    (segmentId: ApiTypes.Segment["id"]) => async () => {
      await jwtAxios.delete(`${SEGMENTS_URL}/${segmentId}`);
      refetch();
    },
    []
  );

  return (
    <Container size="xl">
      <Flex align="center" justify="space-between">
        <Title>Segments</Title>
        <Button
          leftIcon={<IconCirclePlus />}
          onClick={toggleAddSegmentModalVisibility}
        >
          Add segment
        </Button>
      </Flex>

      {/* Modal */}
      <SegmentsModal
        isVisible={isAddSegmentModalVisible}
        onSubmit={handleAddSegment}
        onClose={toggleAddSegmentModalVisibility}
      />

      {hasSegments ? (
        // segments
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
                <Tooltip label="Delete segment" position="bottom-start">
                  <Text>
                    <IconTrash onClick={handleDeleteSegment(segment.id)} />
                  </Text>
                </Tooltip>
              </Flex>
              <Divider />
            </Fragment>
          ))}
        </Paper>
      ) : (
        <Text>No segments found</Text>
      )}
    </Container>
  );
};

const Loader = () => {
  const {
    data,
    error,
    isLoading,
    fetchData: refetch,
  } = useFetch<ApiTypes.Segment[]>({
    url: SEGMENTS_URL,
  });

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (data === null) {
    return isLoading === false && error ? (
      <Text>Error: Could not fetch segments</Text>
    ) : null;
  }

  return <Segments segments={data} refetch={refetch} />;
};

export default Loader;
