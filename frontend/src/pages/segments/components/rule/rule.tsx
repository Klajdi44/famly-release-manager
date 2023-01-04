import { Paper, Flex, NativeSelect, MultiSelect } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { attributes, operators, Attributes, Operators } from "../../constants";

type Props = {
  attribute: Attributes | undefined;
  operator: Operators | undefined;
  values: string[];
  isReadOnly: boolean;
  onSubmit?: () => void;
};

const Rule = ({ isReadOnly, onSubmit, ...restOfProps }: Props) => {
  const [attribute, setAttribute] = useState<undefined | Attributes>(
    restOfProps.attribute
  );
  const [operator, setOperator] = useState<undefined | Operators>(
    restOfProps.operator
  );
  const [values, setValues] = useState<string[] | undefined>(
    restOfProps.values
  );

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
  };

  return (
    <Paper p="lg" m="md">
      <Flex justify="space-around" wrap="wrap" gap="md">
        <NativeSelect
          value={attribute?.value}
          data={attributes}
          placeholder="Select an attribute"
          onChange={handleAttributeChange}
          disabled={isReadOnly}
        />
        <NativeSelect
          value={operator?.value}
          data={operators}
          onChange={handleOperatorChange}
          placeholder="Select an operator"
          disabled={isReadOnly}
        />

        <MultiSelect
          value={values}
          data={restOfProps.values}
          placeholder="Enter some values"
          onChange={handleResultChange}
          disabled={isReadOnly}
        />
        {/* 
        <Center>
          <Button variant="outline" color="red" onClick={handleSubmit}>
            Delete
          </Button>
        </Center> */}
      </Flex>
    </Paper>
  );
};

export { Rule };
