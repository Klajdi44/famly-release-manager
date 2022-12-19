import {
  Button,
  Center,
  Flex,
  MultiSelect,
  NativeSelect,
  Paper,
  Text,
} from "@mantine/core";
import { useState, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../../../components/centered-loader/centered-loader";
import { useFetch } from "../../../../hooks/use-fetch/use-fetch";
import * as ApiTypes from "../../../types/apitypes";
import {
  attributes,
  operators,
  Attributes,
  Operators,
  countries,
  packages,
} from "../../constants";

const SEGMENT_ID_PARAM = "id";
const SEGMENT_URL = "v1/segments";

type SegmentProps = {
  segment: ApiTypes.Segment;
};

const Segment = ({ segment }: SegmentProps) => {
  const [attribute, setAttribute] = useState<undefined | Attributes>(undefined);
  const [operator, setOperator] = useState<undefined | Operators>(undefined);

  // if its only 1 we include it inside an array anyway,
  // if another rule is added then it will automatically be added in the OR object {
  // OR: []..
  // }

  const handleAttributeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAttribute = attributes.find(
      attribute => attribute.value === event.target.value
    );

    if (selectedAttribute === undefined) {
      return;
    }

    setAttribute(selectedAttribute);
  };

  const handleOperatorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOperator = operators.find(
      operator => operator.value === event.target.value
    );

    if (selectedOperator === undefined) {
      return;
    }

    setOperator(selectedOperator);
  };

  const getData = (attribute: Attributes) => {
    switch (attribute?.id) {
      case "COUNTRY":
        return countries;

      case "PACKAGE":
        return packages;

      default:
        return [];
    }
  };

  // const handleSubmit = () => {
  //   const query = {};
  //   if (operator?.id === "IS_ONE_OF") {
  //     query[attribute?.id.toLocaleLowerCase()] = {
  //       OR: thirdValue.split(",").map(x => ({ [firstValue]: x })),
  //     };
  //   } else if (operator?.id === "IS_NOT_ONE_OF") {
  //     query[firstValue] = {
  //       NOT: thirdValue.split(",").map(x => ({ [firstValue]: x })),
  //     };
  //   }

  //   // Send the query object to the backend here
  //   console.log(query);
  // };

  return (
    <div>
      {/* <Text>Id: {segment.id}</Text> */}
      <Text size="xl" fw="bold">
        Include Sites who match these rules
      </Text>
      <Paper p="lg" m="md">
        <Flex justify="space-around">
          <NativeSelect
            value={attribute?.value}
            data={attributes}
            placeholder="Select an attribute"
            onChange={handleAttributeChange}
          />
          <NativeSelect
            data={operators}
            value={operator?.value}
            onChange={handleOperatorChange}
            placeholder="Select an operator"
          />
          <MultiSelect
            data={attribute ? getData(attribute) : []}
            placeholder="Enter some values"
          />
        </Flex>
      </Paper>
      <Center>
        <Button>Save</Button>
      </Center>
    </div>
  );
};

type SegmentLoaderProps = {
  segmentId: string;
};

const SegmentLoader = ({ segmentId }: SegmentLoaderProps) => {
  const { data, error, isLoading } = useFetch<ApiTypes.Segment>({
    url: `${SEGMENT_URL}/${segmentId}`,
  });

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (error && error !== "canceled") {
    return <Text>Something went wrong while getting the segment</Text>;
  }

  if (data === null) {
    return <Text>No segment with id: {segmentId} was found!</Text>;
  }

  return <Segment segment={data} />;
};

const WithUrlParams = () => {
  const [params] = useSearchParams();
  const segmentId = params.get(SEGMENT_ID_PARAM);

  if (segmentId === null) {
    return <Text>Error: toggle Id missing from URL</Text>;
  }

  return <SegmentLoader segmentId={segmentId} />;
};

export default WithUrlParams;
