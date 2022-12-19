import * as ApiTypes from "../types/apitypes";

type TransformDomainCountryToApiCountry = (
  // eslint-disable-next-line no-unused-vars
  countriesFromResults: string[],
  // eslint-disable-next-line no-unused-vars
  countries: ApiTypes.Country[]
) => {
  countryId: string;
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
      countryId: foundCountry.id,
    };
  });
};

export { transformDomainCountryToApiCountry };
