import React, { FunctionComponent } from "react";
import { ApiCountry } from "../lib/types";
import {
  CardBody,
  CardContent,
  CardHeader,
  CountryCardStyled,
} from "./styled/CountryCard.styled";
import { Detail } from "./styled/Detail.styled";
import { Text } from "./styled/Text.styled";
import { Title } from "./styled/Title.styled";

export type BorderingComponentProperties = {
  readonly borderCountry: ApiCountry;
};
const BorderingComponent: FunctionComponent<BorderingComponentProperties> = ({
  borderCountry,
}) => {
  return (
    <CountryCardStyled>
      <CardBody>
        <CardHeader>
          <img
            src={borderCountry.flags?.png}
            alt={`${borderCountry.name?.common}-flag`}
          />
          <div>
            <Title> {borderCountry.name?.common}</Title>
            <Text>{borderCountry.name?.official}</Text>
          </div>
        </CardHeader>
      </CardBody>
      <CardContent>
        <Detail>
          Population: {borderCountry.population?.toLocaleString()}
        </Detail>
      </CardContent>
    </CountryCardStyled>
    //   </a>
    // </Link>
  );
};
export default BorderingComponent;
