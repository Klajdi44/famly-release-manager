import {
  Button,
  Center,
  Flex,
  MultiSelect,
  NativeSelect,
  Paper,
  Text,
} from "@mantine/core";
import { useState, ChangeEvent, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../../../components/centered-loader/centered-loader";
import { useFetch } from "../../../../hooks/use-fetch/use-fetch";
import * as ApiTypes from "../../../types/apitypes";
import * as SegmentTransformers from "../../transformers";
import { attributes, operators, Attributes, Operators } from "../../constants";

type SegmentProps = {
  countries: ApiTypes.Country[];
  segment: ApiTypes.Segment;
  subscriptions: ApiTypes.Subscription[];
};

const Segment = ({ countries, segment, subscriptions }: SegmentProps) => {
  const [attribute, setAttribute] = useState<undefined | Attributes>(undefined);
  const [operator, setOperator] = useState<undefined | Operators>(undefined);
  const [result, setResult] = useState<string[] | undefined>(undefined);

  const getData = useCallback(
    (attribute: Attributes) => {
      switch (attribute?.id) {
        case "COUNTRY":
          return countries.map(country => country.name);

        case "SUBSCRIPTION":
          return subscriptions.map(subscription => subscription.title);

        default:
          return [];
      }
    },
    [attribute, countries, subscriptions]
  );

  const handleAttributeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAttribute = attributes.find(
      attribute => attribute.value === event.target.value
    );

    if (selectedAttribute === undefined) {
      return;
    }

    setAttribute(selectedAttribute);
    setResult([]);
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

  const handleResultChange = (results: string[]) => {
    setResult(results);
  };

  const handleSubmit = async () => {
    if (
      attribute === undefined ||
      operator === undefined ||
      result === undefined
    ) {
      return;
    }

    let query = {};

    if (operator.id === "IS_ONE_OF") {
      if (attribute.id === "COUNTRY") {
        query = {
          ...query,
          OR: SegmentTransformers.transformDomainCountryToApiCountry(
            result,
            countries
          ),
        };
      } else if (attribute.id === "SUBSCRIPTION") {
        query = {
          ...query,
          OR: SegmentTransformers.transformDomainSubscriptionToApiSubscription(
            result,
            subscriptions
          ),
        };
      }
    }

    if (operator.id === "IS_NOT_ONE_OF") {
      if (attribute.id === "COUNTRY") {
        query = {
          ...query,
          NOT: SegmentTransformers.transformDomainCountryToApiCountry(
            result,
            countries
          ),
        };
      } else if (attribute.id === "SUBSCRIPTION") {
        query = {
          ...query,
          NOT: SegmentTransformers.transformDomainSubscriptionToApiSubscription(
            result,
            subscriptions
          ),
        };
      }
    }

    // Send the query object to the backend here
    console.log({ query });
  };

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
            value={result}
            data={attribute ? getData(attribute) : []}
            placeholder="Enter some values"
            onChange={handleResultChange}
          />
        </Flex>
      </Paper>
      <Center>
        <Button onClick={handleSubmit}>Save</Button>
      </Center>
    </div>
  );
};

type SegmentLoaderProps = {
  segmentId: string;
};

const SegmentLoader = ({ segmentId }: SegmentLoaderProps) => {
  const { data, error, isLoading } = useFetch<ApiTypes.Segment>({
    url: `v1/segments/${segmentId}`,
  });

  const {
    data: countries,
    error: countryError,
    isLoading: isCountriesLoading,
  } = useFetch<ApiTypes.Country[]>({
    url: "v1/countries",
  });

  const {
    data: subscriptions,
    error: packageError,
    isLoading: isSubscriptionsLoading,
  } = useFetch<ApiTypes.Subscription[]>({
    url: "v1/subscriptions",
  });

  if (isLoading || isCountriesLoading || isSubscriptionsLoading) {
    return <CenteredLoader />;
  }

  if ((error || packageError || countryError) && error !== "canceled") {
    return <Text>Something went wrong while getting the segment</Text>;
  }

  if (data === null) {
    return <Text>No segment with id: {segmentId} was found!</Text>;
  }

  if (countries === null || subscriptions === null) {
    return <Text>Failed to get countries and subscriptions</Text>;
  }

  return (
    <Segment
      segment={data}
      countries={countries}
      subscriptions={subscriptions}
    />
  );
};

const WithUrlParams = () => {
  const [params] = useSearchParams();
  const segmentId = params.get("id");

  if (segmentId === null) {
    return <Text>Error: toggle Id missing from URL</Text>;
  }

  return <SegmentLoader segmentId={segmentId} />;
};

export default WithUrlParams;
