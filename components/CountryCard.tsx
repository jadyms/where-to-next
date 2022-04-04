import React, { FunctionComponent } from "react";
import { ApiCountry } from "../lib/types";

export type CountryCardProperties = {
  readonly country: ApiCountry;
};
const CountryCard: FunctionComponent<CountryCardProperties> = ({ country }) => {
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="border-gray-100 border rounded-md flex-col p-2"
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex">
          <img
            className="h-8 w-10 object-contain rounded-md"
            src={country.flags?.png}
            alt={`${country.name?.common}-flag`}
          />
          <div className="ml-3 flex flex-col">
            <span className="text-lg font-medium">{country.name?.common}</span>

            <span className="text-sm text-gray-500">
              {country.name?.official}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-medium">
            Population:{country.population?.toLocaleString()}
          </span>
        </div>
      </div>

      {/* <button
        id="btn-details"
        className="p-2 rounded-md bg-blue-600 hover:opacity-75 text-white"
        onClick={() => onClick(country.cca3)}
      >
        Go to details
      </button> */}
    </div>
  );
};
export default CountryCard;
