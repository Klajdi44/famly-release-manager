import * as ApiTypes from "../types/apitypes";
import { Attributes, Operators } from "./constants";

type TransformApiAttributeToDomainAttribute = (
  // eslint-disable-next-line no-unused-vars
  ApiAttribute: ApiTypes.Rule["attribute"]
) => Attributes | undefined;

const transformApiAttributeToDomainAttribute: TransformApiAttributeToDomainAttribute =
  apiAttribute => {
    switch (apiAttribute) {
      case "COUNTRY":
        return {
          id: "COUNTRY",
          label: "Country",
          value: "country",
        };

      case "SUBSCRIPTION":
        return {
          id: "SUBSCRIPTION",
          label: "Subscription",
          value: "subscription",
        };

      case "SITE_ID":
        return {
          id: "SITE_ID",
          label: "Site Id",
          value: "siteId",
        };
    }
  };

type TransformApiOperatorToDomainOperator = (
  // eslint-disable-next-line no-unused-vars
  ApiOperator: ApiTypes.Rule["operator"]
) => Operators | undefined;

const transformApiOperatorToDomainAttribute: TransformApiOperatorToDomainOperator =
  ApiOperator => {
    switch (ApiOperator) {
      case "IS_ONE_OF":
        return {
          id: "IS_ONE_OF",
          label: "Is one of",
          value: "isOneOf",
        };

      case "IS_NOT_ONE_OF":
        return {
          id: "IS_NOT_ONE_OF",
          label: "Is not one of",
          value: "isNotOneOf",
        };

      default:
        return undefined;
    }
  };

type TransformDomainCountryToApiCountry = (
  // eslint-disable-next-line no-unused-vars
  countriesFromResults: string[],
  // eslint-disable-next-line no-unused-vars
  countries: ApiTypes.Country[]
) => {
  id: string;
}[];

const transformDomainCountryToApiCountry: TransformDomainCountryToApiCountry = (
  countriesFromResults,
  countries
) => {
  return countriesFromResults.flatMap(countryResult => {
    const foundCountry = countries.find(
      country => country.name === countryResult
    );

    if (foundCountry === undefined) {
      return [];
    }

    return {
      id: foundCountry.id,
      name: foundCountry.name,
    };
  });
};

type TransformDomainSubscriptionToApiSubscription = (
  // eslint-disable-next-line no-unused-vars
  subscriptionsFromResults: string[],
  // eslint-disable-next-line no-unused-vars
  subscriptions: ApiTypes.Subscription[]
) => {
  id: string;
}[];

const transformDomainSubscriptionToApiSubscription: TransformDomainSubscriptionToApiSubscription =
  (subscriptionsFromResults, subscriptions) => {
    return subscriptionsFromResults.flatMap(subscriptionResult => {
      const foundSubscription = subscriptions.find(
        subscription => subscription.name === subscriptionResult
      );

      if (foundSubscription === undefined) {
        return [];
      }

      return {
        id: foundSubscription.id,
        name: foundSubscription.name,
      };
    });
  };

type TransformDomainSiteToApiSite = (
  // eslint-disable-next-line no-unused-vars
  sitesFromResults: string[],
  // eslint-disable-next-line no-unused-vars
  sites: ApiTypes.Site[]
) => {
  id: number;
  name: string;
}[];

const transformDomainSiteToApiSite: TransformDomainSiteToApiSite = (
  sitesFromResults,
  sites
) => {
  return sitesFromResults.flatMap(siteResult => {
    const foundSite = sites.find(site => String(site.id) === siteResult);
    console.log({ foundSite });

    if (foundSite === undefined) {
      return [];
    }

    return {
      id: foundSite.id,
      name: foundSite.name,
    };
  });
};
export {
  transformDomainCountryToApiCountry,
  transformDomainSubscriptionToApiSubscription,
  transformApiAttributeToDomainAttribute,
  transformApiOperatorToDomainAttribute,
  transformDomainSiteToApiSite,
};
