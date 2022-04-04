import React, { FunctionComponent } from "react";
import { ApiCountry, Currency, Language } from "../lib/types";

export type CountryCardProperties = {
  readonly currentCountry: ApiCountry;
};
const CountryDetailsComponent: FunctionComponent<CountryCardProperties> = ({
  currentCountry,
}) => {
  const languages =
    currentCountry?.languages &&
    Object.keys(currentCountry.languages).reduce((next, key) => {
      next.push({ code: key, name: currentCountry.languages[key] });
      return next;
    }, [] as Language[]);

  const currenciesId = currentCountry?.currencies
    ? Object.keys(currentCountry.currencies)
    : [];
  const hasCurrency = currenciesId.length > 0;

  const currencies: Currency[] | null = hasCurrency
    ? currenciesId.map((id) => {
        return {
          name: currentCountry.currencies[id]?.name,
          symbol: currentCountry?.currencies[id]?.symbol,
        };
      })
    : null;
  return (
    <div className="w-full">
      <div
        style={{ width: "100%", height: "100%" }}
        className="border-gray-100 border rounded-md flex-col p-2 sm:mx-2 w-full"
      >
        <img
          className="rounded-md"
          src={currentCountry.flags?.png}
          alt={`${currentCountry.name?.common}-flag`}
        />
        {/* todo name atom */}
        <div className="flex flex-col">
          <span className="text-lg font-medium">
            {currentCountry.name?.common}
          </span>

          <span className="text-sm text-gray-500">
            {currentCountry.name?.official}
          </span>
        </div>

        <div className="grid grid-cols-3 py-5">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 font-medium">Capital</span>
            {currentCountry.capital?.map((i) => (
              <span className="text-sm" key={i[0]}>
                {i}
              </span>
            ))}
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500 font-medium">Languages</span>
            {languages &&
              languages.map((i) => (
                <span className="text-sm" key={i.code}>
                  {i.name}
                </span>
              ))}
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500 font-medium">
              Currencies
            </span>
            {currencies &&
              currencies.map((i) => (
                <span className="text-sm" key={i.name}>
                  {i.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountryDetailsComponent;
