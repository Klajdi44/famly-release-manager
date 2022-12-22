import { Button, Text } from "@mantine/core";
import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../../../components/centered-loader/centered-loader";
import { useFetch } from "../../../../hooks/use-fetch/use-fetch";
import * as ApiTypes from "../../../types/apitypes";
import * as SegmentTransformers from "../../transformers";
import { Attributes, Operators } from "../../constants";
import { Rule } from "../rule/rule";
import AddRuleModal from "../add-rule-modal/add-rule-modal";

type SegmentProps = {
  countries: ApiTypes.Country[];
  segment: ApiTypes.Segment;
  subscriptions: ApiTypes.Subscription[];
};

const SegmentContainer = ({
  countries,
  segment,
  subscriptions,
}: SegmentProps) => {
  const [isAddRuleModalVisible, setIsAddRuleModalVisible] = useState(false);

  const getAttribute = useCallback(
    (attribute: ApiTypes.Rule["attribute"]): Attributes | undefined =>
      SegmentTransformers.transformApiAttributeToDomainAttribute(attribute),
    [segment.rules]
  );

  const getOperator = useCallback(
    (operator: ApiTypes.Rule["operator"]): Operators | undefined =>
      SegmentTransformers.transformApiOperatorToDomainAttribute(operator),
    [segment.rules]
  );

  const toggleIsAddRuleModalVisible = () =>
    setIsAddRuleModalVisible(prevState => !prevState);

  return (
    <div>
      <Button onClick={toggleIsAddRuleModalVisible}>Add new rule</Button>

      {/* Add new rule modal */}
      <AddRuleModal
        isVisible={isAddRuleModalVisible}
        onClose={toggleIsAddRuleModalVisible}
        onSubmit={() => {}}
        countries={countries}
        subscriptions={subscriptions}
      />

      <Text size="xl" fw="bold">
        {/* Include Sites who match these rules */}
        Applied rules
      </Text>

      {segment.rules.map((rule, i) => (
        <Rule
          key={rule.id + i}
          attribute={getAttribute(rule.attribute)}
          operator={getOperator(rule.operator)}
          values={rule.values.map(value => value.name)}
          isReadOnly={true}
        />
      ))}
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
    <SegmentContainer
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
