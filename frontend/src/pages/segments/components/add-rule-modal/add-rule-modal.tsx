import { ChangeEvent, useMemo, useState } from "react";
import {
  Button,
  Flex,
  Modal,
  MultiSelect,
  NativeSelect,
  Radio,
} from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { Attributes, attributes, Operators, operators } from "../../constants";
import * as ApiTypes from "../../../types/apitypes";
import * as SegmentTransformers from "../../transformers";

const defaultAttribute = attributes[0];
const defaultOperator = operators[0];

type OnSubmitParams = ApiTypes.RulesPayload;

type Props = {
  isVisible: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (params: OnSubmitParams) => void;
  countries: ApiTypes.Country[];
  subscriptions: ApiTypes.Subscription[];
};

const AddRuleModal = ({
  onClose,
  onSubmit,
  isVisible,
  countries,
  subscriptions,
}: Props) => {
  const [attribute, setAttribute] = useState<undefined | Attributes>(
    defaultAttribute
  );
  const [operator, setOperator] = useState<undefined | Operators>(
    defaultOperator
  );
  const [values, setValues] = useState<string[] | undefined>(undefined);

  const memoizedValues = useMemo(() => {
    switch (attribute?.id) {
      case "COUNTRY":
        return countries.map(country => country.name);

      case "SUBSCRIPTION":
        return subscriptions.map(subscription => subscription.name);

      default:
        return [];
    }
  }, [countries, subscriptions, attribute, operator]);

  const resetState = () => {
    setAttribute(defaultAttribute);
    setOperator(defaultOperator);
    setValues(undefined);
  };

  const handleAttributeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAttribute = attributes.find(
      attribute => attribute.value === event.target.value
    );

    if (selectedAttribute === undefined) {
      return;
    }

    setAttribute(selectedAttribute);
    setValues([]);
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
    setValues(results);
  };

  const handleSubmit = async () => {
    if (
      attribute === undefined ||
      operator === undefined ||
      values === undefined
    ) {
      return;
    }

    const getApiValuePayload = ({
      attribute,
      values,
      countries,
      subscriptions,
    }: {
      attribute: Attributes;
      values: string[];
      countries: ApiTypes.Country[];
      subscriptions: ApiTypes.Subscription[];
    }) => {
      switch (attribute.id) {
        case "COUNTRY":
          return SegmentTransformers.transformDomainCountryToApiCountry(
            values,
            countries
          );

        case "SUBSCRIPTION":
          return SegmentTransformers.transformDomainSubscriptionToApiSubscription(
            values,
            subscriptions
          );

        default:
          return [];
      }
    };

    const payload: ApiTypes.RulesPayload = {
      id: uuidv4(),
      attribute: attribute.id,
      operator: operator.id,
      values: getApiValuePayload({
        attribute,
        values,
        countries,
        subscriptions,
      }),
    };

    onSubmit(payload);
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
      title="Add new rule"
    >
      <Flex gap="xl" wrap="wrap" align="center" justify="start">
        <div>IF</div>
        <NativeSelect
          value={attribute?.value}
          data={attributes}
          description="Select an attribute"
          onChange={handleAttributeChange}
        />
        <NativeSelect
          value={operator?.value}
          data={operators}
          description="Select an operator"
          onChange={handleOperatorChange}
        />

        <MultiSelect
          value={values}
          data={memoizedValues}
          onChange={handleResultChange}
          placeholder="Values"
          description="Select matching values"
        />
        <div>
          Then include <Radio value="ALL" checked label="all sites" />
        </div>
      </Flex>

      <Button mt={20} variant="filled" onClick={handleSubmit}>
        Submit
      </Button>
    </Modal>
  );
};

export default AddRuleModal;
// export type { OnSubmitParams };