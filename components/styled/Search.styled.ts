import React from "react";
import styled from "styled-components";
import { SearchProperties } from "../Search";

export const Search = styled.input<SearchProperties>`
  width: 100%;
  border-radius: 0.375rem;
  padding: 0.5rem;
  input:focus {
    outline: 2px solid blue;
    outline-offset: 2px;
  }
` as React.FunctionComponent<SearchProperties>;
