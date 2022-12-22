import { Attributes, Operators } from "../segments/constants";

type ReleaseToggle = {
  id: number;
  name: string;
  description: string;
  releaseAt: string;
  createdAt: string;
  updatedAt: string;
  userId: number | null;
  segments: [];
  user: User | null;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type Attribute = "COUNTRY" | "SUBSCRIPTION" | "SITE_ID";

type Operator = "isOneOf" | "isNotOneOf";

type Rule = {
  attribute: Attribute;
  operator: Operator;
  id: string;
  values: Record<string, string>[];
};

type Segment = {
  id: string;
  title: string;
  description: string;
  rules: Rule[];
};

type Country = {
  countryId: string;
  name: string;
};

type Subscription = {
  subscriptionId: string;
  name: string;
};

type RulesPayload = {
  id: string;
  attribute: Attributes["id"];
  operator: Operators["id"];
  values: Record<string, string | number>[];
};

export type {
  ReleaseToggle,
  User,
  Segment,
  Subscription,
  Country,
  Rule,
  RulesPayload,
};
