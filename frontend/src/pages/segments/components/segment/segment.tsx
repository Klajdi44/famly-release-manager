import { Button, Container, Flex, Paper, Text } from "@mantine/core";
import { useState, useCallback, useMemo } from "react";
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
  sites: ApiTypes.Site[];
  refetchSegment: () => Promise<void>;
};

const SegmentContainer = ({
  countries,
  segment,
  subscriptions,
  sites,
  refetchSegment,
}: SegmentProps) => {
  const [isAddRuleModalVisible, setIsAddRuleModalVisible] = useState(false);

  const { fetchData: AddNewRule } = useFetch({
    url: `v1/segments/${segment.id}`,
    method: "post",
    lazy: true,
  });

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

  const handleSubmitNewRule = async (rule: ApiTypes.RulesPayload) => {
    console.log(rule);
    toggleIsAddRuleModalVisible();
    await AddNewRule({ rules: [rule] });
    refetchSegment();
  };

  const { hasSites, sitesLength, hasRules } = useMemo(() => {
    return {
      hasSites: segment.sites.length > 0,
      sitesLength: segment.sites.length,
      hasRules: segment.rules.length > 0,
    };
  }, [segment]);

  return (
    <Container>
      {/* Add new rule modal */}
      <AddRuleModal
        isVisible={isAddRuleModalVisible}
        onClose={toggleIsAddRuleModalVisible}
        onSubmit={handleSubmitNewRule}
        countries={countries}
        subscriptions={subscriptions}
        sites={sites}
      />

      <Flex justify="end">
        <Button onClick={toggleIsAddRuleModalVisible}>Add new rule</Button>
      </Flex>

      <Text size="xl" fw="bold">
        {hasSites
          ? `This segment includes ${sitesLength} ${
              sitesLength > 1 ? "sites" : "site"
            }`
          : "This segment does not include any sites!"}
      </Text>

      {hasSites && (
        <Paper p="md" m="md">
          {segment.sites.map(site => (
            <Text key={site.id}>{site.name}</Text>
          ))}
        </Paper>
      )}

      <Text size="xl" fw="bold">
        {hasRules ? "Applied rules" : "No rules applied to this Segment!"}
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
    </Container>
  );
};

type SegmentLoaderProps = {
  segmentId: string;
};

const SegmentLoader = ({ segmentId }: SegmentLoaderProps) => {
  const {
    data,
    error,
    isLoading,
    fetchData: refetchSegment,
  } = useFetch<ApiTypes.Segment>({
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

  const {
    data: sites,
    error: sitesError,
    isLoading: isSitesLoading,
  } = useFetch<ApiTypes.Subscription[]>({
    url: "v1/sites",
  });

  if (
    isLoading ||
    isCountriesLoading ||
    isSubscriptionsLoading ||
    isSitesLoading
  ) {
    return <CenteredLoader />;
  }

  if (
    (error || packageError || countryError || sitesError) &&
    (error || packageError || countryError) !== "canceled"
  ) {
    return <Text>Something went wrong while getting the segment</Text>;
  }

  if (data === null) {
    return <Text>No segment with id: {segmentId} was found!</Text>;
  }

  if (countries === null || subscriptions === null || sites === null) {
    return <Text>Failed to get countries and subscriptions</Text>;
  }

  return (
    <SegmentContainer
      countries={countries}
      segment={data}
      subscriptions={subscriptions}
      sites={sites}
      refetchSegment={refetchSegment}
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
