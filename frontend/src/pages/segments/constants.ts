type Attributes =
  | {
      value: "country";
      label: "Country";
      id: "COUNTRY";
    }
  | {
      value: "siteId";
      label: "Site Id";
      id: "SITE_ID";
    }
  | {
      value: "subscription";
      label: "Subscription";
      id: "SUBSCRIPTION";
    };

const attributes: Attributes[] = [
  {
    value: "country",
    label: "Country",
    id: "COUNTRY",
  },
  {
    value: "siteId",
    label: "Site Id",
    id: "SITE_ID",
  },
  {
    value: "subscription",
    label: "Subscription",
    id: "SUBSCRIPTION",
  },
];

type Operators =
  | { value: "isOneOf"; label: "Is one of"; id: "IS_ONE_OF" }
  | { value: "isNotOneOf"; label: "Is not one of"; id: "IS_NOT_ONE_OF" };

const operators: Operators[] = [
  { value: "isOneOf", label: "Is one of", id: "IS_ONE_OF" },
  { value: "isNotOneOf", label: "Is not one of", id: "IS_NOT_ONE_OF" },
];

export { attributes, operators };
export type { Attributes, Operators };
