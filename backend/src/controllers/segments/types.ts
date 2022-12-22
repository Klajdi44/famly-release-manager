type Attribute = "COUNTRY" | "SUBSCRIPTION" | "SITE_ID";

type Operator = "IS_ONE_OF" | "IS_NOT_ONE_OF";

type Rule = {
  attribute: Attribute;
  operator: Operator;
  id: string;
  values: { name: string; id: number | string }[];
};

export { Attribute, Operator, Rule };
