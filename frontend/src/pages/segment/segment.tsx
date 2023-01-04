import { Accordion, Button, Container, Flex, Text, Title } from "@mantine/core";
import { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../components/centered-loader/centered-loader";
import { useFetch } from "../../hooks/use-fetch/use-fetch";
import * as ApiTypes from "../types/apitypes";
import * as SegmentTransformers from "../segments/transformers";
import { Attributes, Operators } from "../segments/constants";
import { Rule } from "../segments/components/rule/rule";
import AddRuleModal from "../segments/components/add-rule-modal/add-rule-modal";
import { AxiosResponse } from "axios";
import { IconCirclePlus } from "@tabler/icons";

type SegmentProps = {
  countries: ApiTypes.Country[];
  segment: ApiTypes.Segment;
  subscriptions: ApiTypes.Subscription[];
  sites: ApiTypes.Site[];
  refetchSegment: () => Promise<AxiosResponse>;
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
    <Container size="xl">
      {/* Add new rule modal */}
      <AddRuleModal
        isVisible={isAddRuleModalVisible}
        onClose={toggleIsAddRuleModalVisible}
        onSubmit={handleSubmitNewRule}
        countries={countries}
        subscriptions={subscriptions}
        sites={sites}
      />

      <Flex justify="space-between" align="center">
        <Title>{segment.title}</Title>
        <Button
          leftIcon={<IconCirclePlus />}
          onClick={toggleIsAddRuleModalVisible}
        >
          Add new rule
        </Button>
      </Flex>

      <Text size="xl" fw="bold" mt="xl">
        {hasSites
          ? `This segment includes ${sitesLength} ${
              sitesLength > 1 ? "sites" : "site"
            }`
          : "This segment does not include any sites!"}
      </Text>

      {hasSites && (
        <Accordion variant="contained" mt="sm" mb="xl">
          <Accordion.Item value="Sites">
            <Accordion.Control>Sites Included</Accordion.Control>
            <Accordion.Panel>
              {segment.sites.map(site => (
                <Text key={site.id}>{site.name}</Text>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
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
  } = useFetch<ApiTypes.Site[]>({
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
