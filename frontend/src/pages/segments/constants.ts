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
      value: "Package";
      label: "Package";
      id: "PACKAGE";
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
    value: "Package",
    label: "Package",
    id: "PACKAGE",
  },
];

type Operators =
  | { value: "Is one of"; label: "Is one of"; id: "IS_ONE_OF" }
  | { value: "Is not one of"; label: "Is not one of"; id: "IS_NOT_ONE_OF" };

const operators: Operators[] = [
  { value: "Is one of", label: "Is one of", id: "IS_ONE_OF" },
  { value: "Is not one of", label: "Is not one of", id: "IS_NOT_ONE_OF" },
];

const countries = ["UK", "Norway", "USA", "Denmark", "Germany"];

const packages = ["Free", "Starter", "Essentials", "Premium"];

export { attributes, operators, countries, packages };
export type { Attributes, Operators };
