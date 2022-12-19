type Attributes =
  | {
      value: "Country";
      label: "Country";
      id: "COUNTRY";
    }
  | {
      value: "Site Id";
      label: "Site Id";
      id: "SITE_ID";
    }
  | {
      value: "Subscription";
      label: "Subscription";
      id: "SUBSCRIPTION";
    };

const attributes: Attributes[] = [
  {
    value: "Country",
    label: "Country",
    id: "COUNTRY",
  },
  {
    value: "Site Id",
    label: "Site Id",
    id: "SITE_ID",
  },
  {
    value: "Subscription",
    label: "Subscription",
    id: "SUBSCRIPTION",
  },
];

type Operators =
  | { value: "Is one of"; label: "Is one of"; id: "IS_ONE_OF" }
  | { value: "Is not one of"; label: "Is not one of"; id: "IS_NOT_ONE_OF" };

const operators: Operators[] = [
  { value: "Is one of", label: "Is one of", id: "IS_ONE_OF" },
  { value: "Is not one of", label: "Is not one of", id: "IS_NOT_ONE_OF" },
];

export { attributes, operators };
export type { Attributes, Operators };
