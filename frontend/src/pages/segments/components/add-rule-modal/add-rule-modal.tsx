import { ChangeEvent, useMemo, useState } from "react";
import { Button, Flex, Modal, MultiSelect, NativeSelect } from "@mantine/core";
import { Attributes, attributes, Operators, operators } from "../../constants";
import * as ApiTypes from "../../../types/apitypes";
import * as SegmentTransformers from "../../transformers";

// type OnSubmitParams = {
//   title: string;
//   description: string;
// };

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
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
    attributes[0]
  );
  const [operator, setOperator] = useState<undefined | Operators>(operators[0]);
  const [values, setValues] = useState<string[] | undefined>(undefined);

  console.log({ attribute, operator });

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

    if (attribute.id === "COUNTRY") {
      SegmentTransformers.transformDomainCountryToApiCountry(values, countries);
    }

    if (attribute.id === "SUBSCRIPTION") {
      console.log(
        SegmentTransformers.transformDomainSubscriptionToApiSubscription(
          values,
          subscriptions
        )
      );
    }
  };

  return (
    <Modal size="70%" opened={isVisible} onClose={onClose} title="Add new rule">
      <Flex justify="space-between">
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
      </Flex>

      <Button mt={20} variant="filled" onClick={handleSubmit}>
        Submit
      </Button>
    </Modal>
  );
};

export default AddRuleModal;
// export type { OnSubmitParams };
