import React, { FunctionComponent } from "react";
import { ApiCountry, Currency, Language } from "../lib/types";
import {
  CountryDetailsStyled,
  Grid,
  GridContent,
} from "./styled/CountryDetails.styled";

export type CountryCardProperties = {
  readonly currentCountry: ApiCountry;
};
const CountryDetailsComponent: FunctionComponent<CountryCardProperties> = ({
  currentCountry,
}) => {
  const languages =
    currentCountry?.languages &&
    Object.keys(currentCountry.languages).reduce((next, key) => {
      next.push({ code: key, name: currentCountry?.languages[key] });
      return next;
    }, [] as Language[]);

  const currenciesId = currentCountry?.currencies
    ? Object.keys(currentCountry.currencies)
    : [];
  const hasCurrency = currenciesId.length > 0;

  const currencies: Currency[] | null = hasCurrency
    ? currenciesId.map((id) => {
        return {
          name: currentCountry?.currencies[id]?.name,
          symbol: currentCountry?.currencies[id]?.symbol,
        };
      })
    : null;
  return (
    <CountryDetailsStyled>
      <img
        src={currentCountry.flags?.png}
        alt={`${currentCountry.name?.common}-flag`}
      />

      {/* todo name atom */}
      <div className="flex flex-col items-center">
        <span className="text-lg font-medium">
          {currentCountry.name?.common}
        </span>

        <span className="text-sm text-gray-500">
          {currentCountry.name?.official}
        </span>
      </div>

      <Grid>
        <GridContent>
          <span className="text-sm text-gray-500 font-medium">Capital</span>
          {currentCountry.capital?.map((i) => (
            <span className="text-sm" key={i[0]}>
              {i}
            </span>
          ))}
        </GridContent>

        <GridContent>
          <span className="text-sm text-gray-500 font-medium">Languages</span>
          {languages &&
            languages.map((i) => (
              <span className="text-sm" key={i.code}>
                {i.name}
              </span>
            ))}
        </GridContent>

        <GridContent>
          <span className="text-sm text-gray-500 font-medium">Currencies</span>
          {currencies &&
            currencies.map((i) => (
              <span className="text-sm" key={i.name}>
                {i.name}
              </span>
            ))}
        </GridContent>
      </Grid>
    </CountryDetailsStyled>
  );
};
export default CountryDetailsComponent;
