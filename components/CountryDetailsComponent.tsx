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
      if (key && currentCountry?.languages) {
        next.push({ code: key, name: currentCountry.languages[key] });
      }
      return next;
    }, [] as Language[]);

  const currenciesId = currentCountry?.currencies
    ? Object.keys(currentCountry.currencies)
    : [];

  const hasCurrency = currenciesId.length > 0;

  const currencies: Currency[] | any = hasCurrency
    ? currenciesId.map((id) => {
        if (currentCountry?.currencies)
          return {
            name: currentCountry?.currencies[id]?.name,
            symbol: currentCountry?.currencies[id]?.symbol,
          } as Currency;
      })
    : [];
  return (
    <CountryDetailsStyled>
      <img
        src={currentCountry.flags?.png}
        alt={`${currentCountry.name?.common}-flag`}
      />

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
          {currentCountry.capital?.map((capital) => (
            <span className="text-sm" key={capital[0]}>
              {capital}
            </span>
          ))}
        </GridContent>

        <GridContent>
          <span className="text-sm text-gray-500 font-medium">Languages</span>
          {languages &&
            languages.map((language) => (
              <span className="text-sm" key={language.code}>
                {language.name}
              </span>
            ))}
        </GridContent>

        <GridContent>
          <span className="text-sm text-gray-500 font-medium">Currencies</span>
          {currencies &&
            currencies.map((currency: Currency) => (
              <span className="text-sm" key={currency.name}>
                {currency.name}
              </span>
            ))}
        </GridContent>
      </Grid>
    </CountryDetailsStyled>
  );
};
export default CountryDetailsComponent;
